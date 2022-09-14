import { secondsToDuration } from './lib/seconds_to_duration';
import { formatNumber } from './lib/format_number';
import { computeStateDisplay, computeStateDomain } from './lib/compute_state_display';
import { checkConditionalValue, getValue, hideIf, isObject, isUnavailable } from './util';
import { ActionConfig, handleClick, HomeAssistant } from 'custom-card-helpers';
import { HomeAssistantEntity, EntityCondition, RoomCardEntity, RoomCardIcon, RoomCardConfig, EntityStyles } from './types/room-card-types';
import { html, LitElement } from 'lit';
import { LAST_CHANGED, LAST_UPDATED, TIMESTAMP_FORMATS } from './lib/constants';

export const checkConfig = (config: RoomCardConfig) => {
    if (!config.entities && !config.entity && !config.info_entities && !config.rows) {
        throw new Error('Please define entities.');
    }
};

export const computeEntity = (entityId: string) => entityId.substr(entityId.indexOf('.') + 1);

export const entityName = (entity: RoomCardEntity) => {
    return (
        entity.name ||
        (entity.entity ? entity.stateObj.attributes.friendly_name || computeEntity(entity.stateObj.entity_id) : null) ||
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
            entityValue = item.attribute ? entity.attributes[item.attribute] : entity.state;
        }        

        if(item.attribute && !item.entity) {                
            entityValue = stateObj.attributes[item.attribute];
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
        case 'input_boolean':
            return stateObj.state === 'on' ? icon.state_on : icon.state_off;
    }
}

export const entityStateDisplay = (hass: HomeAssistant, entity: RoomCardEntity) => {
    if (isUnavailable(entity.stateObj)) {
        return hass.localize(`state.default.${entity.stateObj.state}`);
    }

    let value = getValue(entity);
    let unit = entity.attribute !== undefined
            ? entity.unit
            : entity.unit || entity.stateObj.attributes.unit_of_measurement;

    if (entity.format) {
        if (isNaN(parseFloat(value)) || !isFinite(value)) {
            // do nothing if not a number
        } else if (entity.format === 'brightness') {
            value = Math.round((value / 255) * 100);
            unit = '%';
        } else if (entity.format.startsWith('duration')) {
            value = secondsToDuration(entity.format === 'duration-m' ? value / 1000 : value);
            unit = undefined;
        } else if (entity.format.startsWith('precision')) {
            const precision = parseInt(entity.format.slice(-1), 10);
            value = formatNumber(parseFloat(value), hass.locale, {
                minimumFractionDigits: precision,
                maximumFractionDigits: precision,
            });
        } else if (entity.format === 'kilo') {
            value = formatNumber(value / 1000, hass.locale, { maximumFractionDigits: 2 });
        } else if (entity.format === 'invert') {
            value = formatNumber(value - value * 2, hass.locale);
        } else if (entity.format === 'position') {
            value = formatNumber(100 - value, hass.locale);
        }
        return `${value}${unit ? ` ${unit}` : ''}`;
    }

    if (entity.attribute) {
        return `${isNaN(value) ? value : formatNumber(value, hass.locale)}${unit ? ` ${unit}` : ''}`;
    }

    const modifiedStateObj = { ...entity.stateObj, attributes: { ...entity.stateObj.attributes, unit_of_measurement: unit } };

    return computeStateDisplay(hass.localize, modifiedStateObj, hass.locale);
};

export const entityStyles = (styles: EntityStyles) => 
    isObject(styles)
        ? Object.keys(styles)
            .map((key) => `${key}: ${styles[key]};`)
            .join('') 
        : '';

export const renderEntitiesRow = (entities: RoomCardEntity[], hass: HomeAssistant, element: LitElement, classes?: string) => {
    return html`<div class="entities-row ${classes}">
            ${entities.map((entity) => renderEntity(entity, hass, element))}
        </div>`;
}

export const renderEntity = (entity: RoomCardEntity, hass: HomeAssistant, element: LitElement) => {
    if (entity === undefined || entity.stateObj == undefined || hideIf(entity, hass)) {
        return null;
    }
    
    const entityValue = getValue(entity);
    const onClick = clickHandler(entity.stateObj.entity_id, entity.tap_action, hass, element);
    const onDblClick = dblClickHandler(entity.stateObj.entity_id, entity.double_tap_action, hass, element);        
    const onHold = holdHandler(entity.stateObj.entity_id, entity.hold_action, hass, element);
    let held: boolean;
    let timer: number;
    let dblClickTimeout: number;

    const start = () => {
        held = false;
        
        timer = window.setTimeout(() => { held = true; }, 500);
    };
  
    const end = (ev: MouseEvent) => {
        // Prevent mouse event if touch event
        ev.preventDefault();
        if (['touchend', 'touchcancel'].includes(ev.type) && timer === undefined) {
          return;
        }
        window.clearTimeout(timer);
        timer = undefined;
        if (held) {
            onHold();
        } else if (entity.double_tap_action !== undefined) {
          if ((ev.type === 'click' && (ev).detail < 2) || !dblClickTimeout) {
            dblClickTimeout = window.setTimeout(() => {
              dblClickTimeout = undefined;                  
              onClick();
            }, 250);
          } else {
            window.clearTimeout(dblClickTimeout);
            dblClickTimeout = undefined;
            onDblClick();
          }
        } else {
            onClick();
        }
    };

    return html`<div class="entity" style="${entityStyles(entity.styles)}"
            @mousedown="${start}" @mouseup="${end}" @touchstart="${start}" @touchend="${end}" @touchcancel="${end}">
            ${entity.show_name === undefined || entity.show_name ? html`<span>${entityName(entity)}</span>` : ''}
            <div>${renderIcon(entity.stateObj, entity, hass)}</div>
            ${entity.show_state ? html`<span>${entityValue}</span>` : ''}
        </div>`;
}

export const renderIcon = (stateObj: HomeAssistantEntity, config: RoomCardEntity | RoomCardConfig, hass: HomeAssistant, classes? : string) => {
    if(config.show_icon !== undefined && config.show_icon === false) {
        return null;
    }

    const customIcon = entityIcon(stateObj, config, hass);

    return html`<state-badge
        class="icon-small ${classes}"
        .stateObj="${stateObj}"
        .overrideIcon="${isObject(customIcon) ? (customIcon as EntityCondition).icon : customIcon as string}"
        .stateColor="${config.state_color}"
        style="${entityStyles(isObject(customIcon) ? (customIcon as EntityCondition).styles : null)}"
    ></state-badge>`;
}

export const renderValue = (entity: RoomCardEntity, hass: HomeAssistant) => {
    if (entity.toggle === true) {
        return html`<ha-entity-toggle .stateObj="${entity.stateObj}" .hass="${hass}"></ha-entity-toggle>`;
    }

    if (entity.show_icon === true) {
        return renderIcon(entity.stateObj, entity, hass);
    }

    if (entity.attribute && [LAST_CHANGED, LAST_UPDATED].includes(entity.attribute)) {
        return html`<ha-relative-time
            .hass=${hass}
            .datetime=${entity.stateObj.attributes[entity.attribute?.replace('-', '_')]}
            capitalize
        ></ha-relative-time>`;
    }
    if (entity.format && TIMESTAMP_FORMATS.includes(entity.format)) {
        const value = getValue(entity);
        const timestamp = new Date(value);
        if (!(timestamp instanceof Date) || isNaN(timestamp.getTime())) {
            return value;
        }
        return html`<hui-timestamp-display
            .hass=${hass}
            .ts=${timestamp}
            .format=${entity.format}
            capitalize
        ></hui-timestamp-display>`;
    }
    
    return entityStateDisplay(hass, entity);
}

export const renderMainEntity = (entity: RoomCardEntity, config: RoomCardConfig, hass: HomeAssistant, element: LitElement) => {
    if (!entity) {
        return null;
    }

    const onClick = clickHandler(entity.stateObj.entity_id, config.tap_action, hass, element);
    const onDblClick = dblClickHandler(entity.stateObj.entity_id, config.double_tap_action, hass, element);
    return html`<div
        class="main-state entity"
        style="${entityStyles(entity.styles)}"
        @click="${onClick}"
        @dblclick="${onDblClick}">
        ${config.entities?.length === 0 || config.icon
            ? renderIcon(entity.stateObj, config, hass, "main-icon")
            : entity.show_state !== undefined && entity.show_state === false ? '' : renderValue(entity, hass)}
    </div>`;
}    

export const renderTitle = (entity: RoomCardEntity, config: RoomCardConfig, hass: HomeAssistant, element: LitElement) => {
    return config.hide_title === true ? '' : html`<div class="title">${renderMainEntity(entity, config, hass, element)} ${config.title}</div>`;
}

export const renderInfoEntity = (entity: RoomCardEntity, hass: HomeAssistant, element: LitElement) => {
    if (entity === undefined || !entity.stateObj || hideIf(entity, hass)) {
        return null;
    }

    const onClick = clickHandler(entity.stateObj.entity_id, entity.tap_action, hass, element);
    return html`<div class="state entity ${entity.show_icon === true ? 'icon-entity' : ''}" style="${entityStyles(entity.styles)}" @click="${onClick}">${renderValue(entity, hass)}</div>`;
}

export const clickHandler = (entity: string, actionConfig: ActionConfig, hass: HomeAssistant, element: LitElement) => {
    return () => handleClick(element, hass, { entity, tap_action: actionConfig }, false, false);
}

export const dblClickHandler = (entity: string, actionConfig: ActionConfig, hass: HomeAssistant, element: LitElement) => {
    return () => handleClick(element, hass, { entity, double_tap_action: actionConfig }, false, true);
}

export const holdHandler = (entity: string, actionConfig: ActionConfig, hass: HomeAssistant, element: LitElement) => {
    return () => handleClick(element, hass, { entity, hold_action: actionConfig }, true, false);
}
