/* eslint-disable @typescript-eslint/ban-types */
import { HomeAssistant } from "custom-card-helpers";
import { HomeAssistantEntity, RoomCardAttributeTemplate, RoomCardConfig, RoomCardEntity, RoomCardIcon } from "./types/room-card-types";
import { evalTemplate } from "./util";

export const templateStyling = (stateObj: HomeAssistantEntity, config: RoomCardEntity | RoomCardConfig, hass: HomeAssistant) : Function => {
    const icon = (config.icon as RoomCardIcon);

    return icon?.template?.styles !== undefined ? evalTemplate(hass, stateObj, icon.template.styles) : null;
}

export const mapTemplate = (entity: RoomCardEntity, config: RoomCardConfig) => {
    if(entity !== undefined && entity.template) {
        const templatesWithMatchingName = config.templates.filter(template => template.name === entity.template);
        if(templatesWithMatchingName.length > 0) {
            const templateFromConfig = templatesWithMatchingName[0];

            return { stateObj: entity.stateObj, ...entity, ...templateFromConfig.template };
        }
    }

    return entity;
}

export const getTemplateOrAttribute = (attribute: string | number | RoomCardAttributeTemplate | boolean, hass: HomeAssistant, stateObj: HomeAssistantEntity) => {
    if(!attribute) {
        return attribute;
    }

    if(typeof attribute == "object") {
        if('template' in attribute) {
            return evalTemplate(hass, stateObj, (attribute as RoomCardAttributeTemplate).template);
        }
    }

    return attribute;
}