import { UNAVAILABLE_STATES } from './lib/constants';

export const isObject = (obj) => typeof obj === 'object' && !Array.isArray(obj) && !!obj;

export const isUnavailable = (stateObj) => !stateObj || UNAVAILABLE_STATES.includes(stateObj.state);

export const hideUnavailable = (stateObj, config) =>
    config.hide_unavailable &&
    (isUnavailable(stateObj) || (config.attribute && stateObj.attributes[config.attribute] === undefined));

export const getValue = (stateObj, config) => {
    return config.attribute ? stateObj.attributes[config.attribute] : stateObj.state;
}

export const hideIf = (stateObj, config, hass) => {
    if (hideUnavailable(stateObj, config)) {
        return true;
    }
    if (config.hide_if === undefined) {
        return false;
    }

    const value = getValue(stateObj, config);
    let hideValues = [];

    if (isObject(config.hide_if)) {
        
        if(config.hide_if.entity && config.hide_if.state) {
            return String(hass.states[config.hide_if.entity].state) === String(config.hide_if.state)
        }

        if (config.hide_if.below && value < config.hide_if.below) {
            return true;
        }
        if (config.hide_if.above && value > config.hide_if.above) {
            return true;
        }
        if (config.hide_if.value) {
            hideValues = hideValues.concat(config.hide_if.value);
        }
    } else {
        hideValues = hideValues.concat(config.hide_if);
    }
    return hideValues.some((hideValue) => (typeof hideValue === 'number' ? hideValue === +value : hideValue === value));
};

export const getEntityIds = (config) =>
    [config.entity, config.entities, config.info_entities]
        .concat(config.entities?.map((entity) => (typeof entity === 'string' ? entity : entity.entity)))
        .concat(config.info_entities?.map((entity) => (typeof entity === 'string' ? entity : entity.entity)))
        .filter((entity) => entity);

export const hasConfigOrEntitiesChanged = (node, changedProps) => {
    if (changedProps.has('config')) {
        return true;
    }

    const oldHass = changedProps.get('_hass');
    if (oldHass) {
        return node.entityIds.some((entity) => oldHass.states[entity] !== node._hass.states[entity]);
    }
    return false;
};
