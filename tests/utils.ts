import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "custom-card-helpers";
import { HTMLTemplateResult } from "lit";
import { createMock } from "ts-auto-mock";
import { HassEntity, HassEntityAttributeBase } from 'home-assistant-js-websocket';
import { HomeAssistantEntity, RoomCardEntity } from "../src/types/room-card-types";

export const createEntity = (entity_id: string, hass: HomeAssistant, state: string, attributes: HassEntityAttributeBase = {}): RoomCardEntity => {
    const stateObj = createMock<HomeAssistantEntity>();
    stateObj.entity_id = entity_id;
    stateObj.attributes = attributes;
    stateObj.state = state;

    const hassEntity = createMock<HassEntity>();
    hassEntity.entity_id = entity_id;
    hassEntity.state = state;

    hass.states[stateObj.entity_id] = hassEntity;

    return {
        entity: entity_id,
        stateObj: stateObj
    };
}

export const getRenderString = (data: HTMLTemplateResult): string => {

    let returnHtml = '';
    if (!data) {
        return returnHtml;
    }

    const { strings, values } = data;

    if (strings === undefined) {
        return returnHtml;
    }

    for (let i = 0; i < strings.length; i++) {

        returnHtml += strings[i];

        if (typeof values[i] === 'string') {
            returnHtml += values[i];
        }
        if (typeof values[i] === 'function') {
            // eslint-disable-next-line @typescript-eslint/ban-types
            returnHtml += (values[i] as Function).name;
        }
        else if (typeof values[i] === 'object') {
            const templates = values[i] as HTMLTemplateResult[];
            if (templates !== undefined && templates !== null) {
                for (let i = 0; i < templates.length; i++) {
                    returnHtml += getRenderString(templates[i] as HTMLTemplateResult);
                }
            }

            const template = values[i] as HTMLTemplateResult;
            if (template !== undefined && templates !== null) {
                returnHtml += getRenderString(template);
            }
        }
    }

    return returnHtml.replace(/\s\s+/g, ' ');
}