import { secondsToDuration } from './lib/seconds_to_duration';
import { formatNumber } from './lib/format_number';
import { computeStateDisplay, computeStateDomain } from './lib/compute_state_display';
import { checkConditionalValue, getValue, isObject, isUnavailable } from './util';
import { HomeAssistant } from 'custom-card-helpers';
import { HomeAssistantEntity, EntityCondition, RoomCardEntity, RoomCardIcon, RoomCardConfig } from './types/room-card-types';

export const checkEntity = (config: RoomCardEntity) => {
    if (isObject(config) && !(config.entity || config.attribute || config.icon)) {
        throw new Error(`Entity object requires at least one 'entity', 'attribute' or 'icon'.`);
    } else if (typeof config === 'string' && config === '') {
        throw new Error('Entity ID string must not be blank.');
    } else if (typeof config !== 'string' && !isObject(config)) {
        throw new Error('Entity config must be a valid entity ID string or entity object.');
    }
};

export const computeEntity = (entityId: string) => entityId.substr(entityId.indexOf('.') + 1);

export const entityName = (stateObj: HomeAssistantEntity, config: RoomCardEntity) => {
    return (
        config.name ||
        (config.entity ? stateObj.attributes.friendly_name || computeEntity(stateObj.entity_id) : null) ||
        null
    );
};

export const entityIcon = (stateObj: HomeAssistantEntity, config: RoomCardEntity | RoomCardConfig, hass: HomeAssistant) => {
    if (!('icon' in config)) return stateObj.attributes.icon || null;
    if (typeof config.icon === 'string') return config.icon || null;

    if(config.icon.state_on) return renderCustomStateIcon(stateObj, config.icon as RoomCardIcon);

    if(config.icon.conditions) return renderConditionIcons(stateObj, config, hass);
}

export const renderConditionIcons = (stateObj: HomeAssistantEntity, config: RoomCardEntity | RoomCardConfig, hass: HomeAssistant) => {
    let entityValue = stateObj.state;
    const iconConditions = (config.icon as RoomCardIcon).conditions as EntityCondition[];
    const matchedConditions = iconConditions.filter(item => {

        if(item.entity) {
            const entity = hass.states[item.entity];
            entityValue = config.attribute ? entity.attributes[item.attribute] : entity.state;
        }

        return checkConditionalValue(item, entityValue);
    });
    
    return matchedConditions.pop();
}

export const renderCustomStateIcon = (stateObj: HomeAssistantEntity, icon: RoomCardIcon) => {
    const domain = computeStateDomain(stateObj);
    
    switch(domain) {
        case 'light':
        case 'switch':
        case 'binary_sensor':
            return stateObj.state === 'on' ? icon.state_on : icon.state_off;
    }
}

export const entityStateDisplay = (hass: HomeAssistant, stateObj: HomeAssistantEntity, config: RoomCardEntity) => {
    if (isUnavailable(stateObj)) {
        return hass.localize(`state.default.${stateObj.state}`);
    }

    let value = getValue(stateObj, config);
    let unit =
        config.attribute !== undefined
            ? config.unit
            : config.unit || stateObj.attributes.unit_of_measurement;

    if (config.format) {
        if (isNaN(parseFloat(value)) || !isFinite(value)) {
            // do nothing if not a number
        } else if (config.format === 'brightness') {
            value = Math.round((value / 255) * 100);
            unit = '%';
        } else if (config.format.startsWith('duration')) {
            value = secondsToDuration(config.format === 'duration-m' ? value / 1000 : value);
            unit = undefined;
        } else if (config.format.startsWith('precision')) {
            const precision = parseInt(config.format.slice(-1), 10);
            value = formatNumber(parseFloat(value), hass.locale, {
                minimumFractionDigits: precision,
                maximumFractionDigits: precision,
            });
        } else if (config.format === 'kilo') {
            value = formatNumber(value / 1000, hass.locale, { maximumFractionDigits: 2 });
        } else if (config.format === 'invert') {
            value = formatNumber(value - value * 2, hass.locale);
        } else if (config.format === 'position') {
            value = formatNumber(100 - value, hass.locale);
        }
        return `${value}${unit ? ` ${unit}` : ''}`;
    }

    if (config.attribute) {
        return `${isNaN(value) ? value : formatNumber(value, hass.locale)}${unit ? ` ${unit}` : ''}`;
    }

    const modifiedStateObj = { ...stateObj, attributes: { ...stateObj.attributes, unit_of_measurement: unit } };

    return computeStateDisplay(hass.localize, modifiedStateObj, hass.locale);
};

export const entityStyles = (config: RoomCardEntity) => 
    isObject(config?.styles)
        ? Object.keys(config.styles)
            .map((key) => `${key}: ${config.styles[key]};`)
            .join('') 
        : '';
