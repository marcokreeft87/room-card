import { HomeAssistant } from 'custom-card-helpers';
import { LitElement } from "lit";
import { createMock } from "ts-auto-mock";
import { renderMainEntity } from "../../src/entity";
import { HomeAssistantEntity, RoomCardConfig, RoomCardEntity } from "../../src/types/room-card-types";
import { getRenderString } from "../utils";

describe('Testing util file function renderValue', () => {
    const hass = createMock<HomeAssistant>();
    const stateObj = createMock<HomeAssistantEntity>();
    const element: LitElement = createMock<LitElement>();
    stateObj.entity_id = 'light.test_entity';
    stateObj.state = 'on';
    
    test('Passing RoomCardEntity, RoomcardConfig, HomeAssistant and LitElement expected html with state', () => {      
        
        const entity: RoomCardEntity = {
            stateObj: stateObj
        };

        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: ''
        };

        const result = renderMainEntity(entity, config, hass, element);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<div class="main-state entity" style="" @click="" @dblclick=""> on </div>');
    })
});