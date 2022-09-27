import { HomeAssistant } from "custom-card-helpers";
import { HomeAssistantEntity, RoomCardConfig, RoomCardEntity, RoomCardIcon } from "./types/room-card-types";
import { evalTemplate } from "./util";

// eslint-disable-next-line @typescript-eslint/ban-types
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