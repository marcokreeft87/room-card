import { secondsToDuration } from './lib/seconds_to_duration';
import { formatNumber } from './lib/format_number';
import { computeStateDisplay, computeStateDomain } from './lib/compute_state_display';
import { checkConditionalValue, evalTemplate, getValue, isObject, isUnavailable, renderClasses } from './util';
import { ActionHandlerEvent, handleAction, hasAction, HomeAssistant } from 'custom-card-helpers';
import { HomeAssistantEntity, EntityCondition, RoomCardEntity, RoomCardIcon, RoomCardConfig, EntityStyles, RoomCardRow, RoomCardAttributeTemplate, CustomIconDomain } from './types/room-card-types';
import { html, HTMLTemplateResult, LitElement } from 'lit';
import { LAST_CHANGED, LAST_UPDATED, TIMESTAMP_FORMATS } from './lib/constants';
import { getTemplateOrAttribute, templateStyling } from './template';
import { hideIfEntity, hideIfRow } from './hide';
import { actionHandler } from './directives/action-handler-directive';

export const checkConfig = (config: RoomCardConfig) => {
    if (config.entities == undefined && config.entity == undefined && config.info_entities === undefined && config.rows === undefined && config.cards === undefined) {
        throw new Error('Please define entities.');
    }
};

export const computeEntity = (entityId: string) => entityId.substr(entityId.indexOf('.') + 1);

export const entityName = (entity: RoomCardEntity, hass: HomeAssistant) => {
    const name = getTemplateOrAttribute(entity.name, hass, entity.stateObj)

    return (
        name ||
        (entity.entity ? entity.stateObj.attributes.friendly_name || computeEntity(entity.stateObj.entity_id) : null) ||
        null
    );
};

export const entityIcon = (stateObj: HomeAssistantEntity, config: RoomCardEntity | RoomCardConfig, hass: HomeAssistant) => {
    if('icon' in config && (config.show_icon === undefined || config.show_icon === false)) {
        throw new Error(`Entity: ${config.entity} => Icon defined but show_icon is set to false or not defined. Please set show_icon to true`);
    }

    if (!('icon' in config)) return stateObj.attributes.icon || null;
    if (typeof config.icon === 'string') return config.icon;

    if(config.icon.state_on) return renderCustomStateIcon(stateObj, config.icon as RoomCardIcon);
    if(config.icon.conditions) return renderConditionIcons(stateObj, config, hass);
    if(config.icon.template?.icon) return evalTemplate(hass, stateObj, config.icon.template.icon);
}

export const renderConditionIcons = (stateObj: HomeAssistantEntity, config: RoomCardEntity | RoomCardConfig, hass: HomeAssistant) => {
    const entityValue = stateObj.state;
    const iconConditions = (config.icon as RoomCardIcon).conditions as EntityCondition[];
    const matchedConditions = iconConditions.filter(item => {

        let checkEntityValue = entityValue;
        if(item.entity) {
            const entity = hass.states[item.entity];
            checkEntityValue = item.attribute ? entity.attributes[item.attribute] : entity.state;
        }        

        if(item.attribute && !item.entity) {                
            checkEntityValue = stateObj.attributes[item.attribute];
        }

        return checkConditionalValue(item, checkEntityValue);
    });
    
    return matchedConditions.pop();
}
export const renderCustomStateIcon = (stateObj: HomeAssistantEntity, icon: RoomCardIcon) => {
    const domain = computeStateDomain(stateObj);
    
    switch(domain) {
        case CustomIconDomain.Light:
        case CustomIconDomain.Switch:
        case CustomIconDomain.BinarySensor:
        case CustomIconDomain.InputBoolean:
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
        ({ value, unit } = extractValue(entity, value, hass, unit));
        return `${value}${unit ? ` ${unit}` : ''}`;
    }

    if (entity.attribute) {
        return `${isNaN(value) ? value : formatNumber(value, hass.locale)}${unit ? ` ${unit}` : ''}`;
    }

    const modifiedStateObj = { ...entity.stateObj, attributes: { ...entity.stateObj.attributes, unit_of_measurement: unit } };

    return computeStateDisplay(hass.localize, modifiedStateObj, hass.locale);
};

export const entityStyles = (styles: EntityStyles | RoomCardAttributeTemplate, stateObj: HomeAssistantEntity, hass: HomeAssistant) => {
    if(!styles) {
        return '';
    }
    
    if ('template' in styles) {
        const templateDefinition = styles as RoomCardAttributeTemplate;
        return evalTemplate(hass, stateObj, templateDefinition.template);
    }

    const entityStyles = styles as EntityStyles;
    return Object.keys(entityStyles)
            .map((key) => `${key}: ${entityStyles[key]};`)
            .join('');
}    

export const renderIcon = (stateObj: HomeAssistantEntity, config: RoomCardEntity | RoomCardConfig, hass: HomeAssistant, classes? : string) : HTMLTemplateResult => {
    if(config.show_icon !== undefined && config.show_icon === false) {
        return null;
    }

    const customIcon = entityIcon(stateObj, config, hass);
    const customStyling = templateStyling(stateObj, config, hass);

    return html`<state-badge
        class="icon-small ${classes}"
        .stateObj="${stateObj}"
        .overrideIcon="${isObject(customIcon) ? (customIcon as EntityCondition).icon : customIcon as string}"
        .stateColor="${config.state_color}"
        style="${customStyling ?? entityStyles(isObject(customIcon) ? (customIcon as EntityCondition).styles : null, hass.states[config.entity], hass)}"
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
            .datetime=${(entity.attribute === LAST_CHANGED ? entity.stateObj.last_changed : entity.stateObj.last_updated)}
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

export const renderMainEntity = (entity: RoomCardEntity | undefined, config: RoomCardConfig, hass: HomeAssistant) : HTMLTemplateResult => {
    if (entity === undefined) {
        return null;
    }

    const stateObj = hass.states[entity.entity];

    return html`<div
        class="main-state entity"
        style="${entityStyles(entity.styles, stateObj, hass)}">
        ${config.entities?.length === 0 || config.icon
            ? renderIcon(entity.stateObj, config, hass, "main-icon")
            : entity.show_state !== undefined && entity.show_state === false ? '' : renderValue(entity, hass)}
    </div>`;
}  

export const clickHandler = (element: LitElement, hass: HomeAssistant, entity: RoomCardEntity, ev: ActionHandlerEvent) => {
    handleAction(element, hass, entity, ev.detail.action);
}

export const renderTitle = (config: RoomCardConfig, hass: HomeAssistant, element: LitElement, entity?: RoomCardEntity) : HTMLTemplateResult => {
    if(config.hide_title === true)
        return null;

    const _handleAction = (ev: ActionHandlerEvent): void => {
        if (hass && ev.detail.action) {
            clickHandler(element, hass, entity ?? { 
                tap_action: config.tap_action,
                double_tap_action: config.double_tap_action,
                hold_action: config.hold_action
              } as RoomCardEntity, ev);
        }
    }

    const hasConfigAction = config.tap_action !== undefined || config.double_tap_action !== undefined;
    const title = getTemplateOrAttribute(config.title, hass, entity?.stateObj);

    return html`<div class="title${(hasConfigAction ? ' clickable' : null)}" @action=${_handleAction}
    .actionHandler=${actionHandler({
        hasHold: hasAction(entity?.hold_action),
        hasDoubleClick: hasAction(entity?.double_tap_action),
      })}>${renderMainEntity(entity, config, hass)} ${title}</div>`;
}

export const renderInfoEntity = (entity: RoomCardEntity, hass: HomeAssistant, element: LitElement) : HTMLTemplateResult => {
    if (entity === undefined || !entity.stateObj || hideIfEntity(entity, hass)) {
        return null;
    }               
    
    const _handleAction = (ev: ActionHandlerEvent): void => {
        if (hass && entity && ev.detail.action) {
            clickHandler(element, hass, entity, ev);
        }
    }

    return html`<div class="state entity ${entity.show_icon === true ? 'icon-entity' : ''}" style="${entityStyles(entity.styles, entity.stateObj, hass)}" 
    @action=${_handleAction}
    .actionHandler=${actionHandler({
        hasHold: hasAction(entity.hold_action),
        hasDoubleClick: hasAction(entity.double_tap_action),
      })}>${renderValue(entity, hass)}</div>`;
}

export const renderEntitiesRow = (config: RoomCardConfig | RoomCardRow, entities: RoomCardEntity[], hass: HomeAssistant, element: LitElement, classes?: string) : HTMLTemplateResult => {    
    if(entities === undefined) {
        return null;
    }   

    return html`<div class="${renderClasses(config, classes)}">${entities.map((entity) => renderEntity(entity, hass, element))}</div>`;
}

export const renderEntity = (entity: RoomCardEntity, hass: HomeAssistant, element: LitElement) : HTMLTemplateResult => {    
    if (entity.stateObj == undefined || hideIfEntity(entity, hass)) {
        return null;
    }                
    
    const _handleAction = (ev: ActionHandlerEvent): void => {
        if (hass && entity && ev.detail.action) {
            clickHandler(element, hass, entity, ev);
        }
    }
    
    return html`<div class="entity" style="${entityStyles(entity.styles, hass.states[entity.entity], hass)}"
            @action=${_handleAction}
            .actionHandler=${actionHandler({
                hasHold: hasAction(entity.hold_action),
                hasDoubleClick: hasAction(entity.double_tap_action),
              })}>
            ${entity.show_name === undefined || entity.show_name ? html`<span>${entityName(entity, hass)}</span>` : ''}
            <div>${renderIcon(entity.stateObj, entity, hass)}</div>
            ${entity.show_state ? html`<span>${entityStateDisplay(hass, entity)}</span>` : ''}
        </div>`;
}

export const renderRows = (rows: RoomCardRow[], hass: HomeAssistant, element: LitElement)  : HTMLTemplateResult => { 
    const filteredRows = rows.filter(row => { return !hideIfRow(row, hass); });

    return html`${filteredRows.map((row) => {
        return renderEntitiesRow(row, row.entities, hass, element);
    })}`;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const extractValue = (entity: RoomCardEntity, value: any, hass: HomeAssistant, unit: string) => {
    if (entity.format.startsWith('precision')) {

        const precision = parseInt(entity.format.slice(-1), 10);
        value = formatNumber(value, hass.locale, {
            minimumFractionDigits: precision,
            maximumFractionDigits: precision,
        });
    }
    else if (isNaN(parseFloat(value)) || !isFinite(value)) {
        // do nothing if not a number
    } else if (entity.format === 'brightness') {
        value = Math.round((value / 255) * 100);
        unit = '%';
    } else if (entity.format.startsWith('duration')) {
        value = secondsToDuration(entity.format === 'duration-m' ? value / 1000 : value);
        unit = undefined;
    } else if (entity.format === 'kilo') {
        value = formatNumber(value / 1000, hass.locale, { maximumFractionDigits: 2 });
    } else if (entity.format === 'invert') {
        value = formatNumber(value - value * 2, hass.locale);
    } else if (entity.format === 'position') {
        value = formatNumber(100 - value, hass.locale);
    }

    return { value, unit };
}

/* eslint-enable @typescript-eslint/no-explicit-any */