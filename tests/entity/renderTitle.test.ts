import { HomeAssistant } from 'custom-card-helpers';
import { LitElement } from "lit";
import { createMock } from "ts-auto-mock";
import { renderTitle } from "../../src/entity";
import { HomeAssistantEntity, RoomCardConfig, RoomCardEntity } from "../../src/types/room-card-types";
import { getRenderString } from "../utils";

describe('Testing util file function renderValue', () => {
    const hass = createMock<HomeAssistant>();
    const stateObj = createMock<HomeAssistantEntity>();
    const element: LitElement = createMock<LitElement>();
    stateObj.entity_id = 'light.test_entity';
    stateObj.state = 'on';
    
    test('Passing  no RoomCardEntity, RoomcardConfig, HomeAssistant and LitElement should return null', () => {      
        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: '',
            hide_title: true
        };

        const entity: RoomCardEntity = {
            stateObj: stateObj
        };

        expect(renderTitle(entity, config, hass, element)).toBeNull();
    }),
    test('Passing  no RoomCardEntity, RoomcardConfig, HomeAssistant and LitElement should return null', () => {      
        const entity: RoomCardEntity = {
            stateObj: stateObj,
            show_icon: true,
            icon: 'mdi:table'
        };

        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: ''
        };

        const result = renderTitle(entity, config, hass, element);
        const htmlResult = getRenderString(result);
        
        expect(htmlResult).toMatch('<div class="title"><div class="main-state entity" style="" @click="" @dblclick=""> <state-badge class="icon-small " .stateObj="" .overrideIcon="mdi:table" .stateColor="" style="" ></state-badge> </div> </div>');
    })
});