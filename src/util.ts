import { HomeAssistant } from 'custom-card-helpers';
import { PropertyValues } from 'lit';
import { UNAVAILABLE_STATES } from './lib/constants';
import { HomeAssistantEntity, RoomCardConfig, RoomCardEntity, EntityCondition } from './types/room-card-types';

export const isObject = (obj: unknown) => typeof obj === 'object' && !Array.isArray(obj) && !!obj;

export const isUnavailable = (stateObj: HomeAssistantEntity) => !stateObj || UNAVAILABLE_STATES.includes(stateObj.state);

export const hideUnavailable = (stateObj: HomeAssistantEntity, config: RoomCardEntity) =>
    config.hide_unavailable &&
    (isUnavailable(stateObj) || (config.attribute && stateObj.attributes[config.attribute] === undefined));

export const getValue = (stateObj: HomeAssistantEntity, config: RoomCardEntity) => {
    return config.attribute ? stateObj.attributes[config.attribute] : stateObj.state;
}

export const hideIf = (stateObj: HomeAssistantEntity, config: RoomCardEntity, hass: HomeAssistant) => {
    if (hideUnavailable(stateObj, config)) {
        return true;
    }
    if (config.hide_if === undefined) {
        return false;
    }

    if (<EntityCondition[]>config.hide_if)
    {
        let entityValue = stateObj.state;
        const matchedConditions = (config.hide_if as EntityCondition[]).filter(item => {
    
            if(item.entity) {
                const entity = hass.states[item.entity];
                entityValue = config.attribute ? entity.attributes[item.attribute] : entity.state;
            }
    
            return checkConditionalValue(item, entityValue);
        });
        
        return matchedConditions.length > 0;
    }
};

export const getEntityIds = (config: RoomCardConfig) =>
    [config.entity, config.entities, config.info_entities]
        .concat(config.entities?.map((entity) => (typeof entity === 'string' ? entity : entity.entity)))
        .concat(config.info_entities?.map((entity) => (typeof entity === 'string' ? entity : entity.entity)))
        .filter((entity) => entity);

export const hasConfigOrEntitiesChanged = (node: RoomCardConfig, changedProps: PropertyValues) => {
    if (changedProps.has('config')) {
        return true;
    }

    const oldHass = changedProps.get('_hass') as HomeAssistant;
    if (oldHass) {
        return node.entityIds.some((entity: string) => oldHass.states[entity] !== node.hass.states[entity]);
    }
    return false;
};

export const checkConditionalValue = (item: EntityCondition, checkValue: unknown) => {
    if(item.condition == 'equals' && checkValue == item.value) {
        return true;
    }
    if(item.condition == 'not_equals' && checkValue != item.value) {
        return true;
    }
    if(item.condition == 'above' && checkValue > item.value) {
        return true;
    }
    if(item.condition == 'below' && checkValue < item.value) {
        return true;
    }
}