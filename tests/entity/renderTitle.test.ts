import { HomeAssistant } from 'custom-card-helpers';
import { LitElement } from "lit";
import { createMock } from "ts-auto-mock";
import { renderTitle } from "../../src/entity";
import { HomeAssistantEntity, RoomCardConfig, RoomCardEntity } from "../../src/types/room-card-types";
import { getRenderString } from "../utils";

describe('Testing entity file function renderValue', () => {
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
    test('Passing no RoomCardEntity, RoomcardConfig, HomeAssistant and LitElement should return expected html', () => {      
        const entity: RoomCardEntity = {
            stateObj: stateObj,
            show_icon: true,
            icon: 'mdi:table'
        };

        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: '',
            tap_action: 'more-info'
        };

        const result = renderTitle(entity, config, hass, element);
        const htmlResult = getRenderString(result);
        
        expect(htmlResult).toMatch('<div class="title clickable" @click="" @dblclick=""><div class="main-state entity" style=""> <state-badge class="icon-small " .stateObj="" .overrideIcon="mdi:table" .stateColor="" style="" ></state-badge> </div> </div>');
    }),
    test('Passing  no RoomCardEntity, RoomcardConfig with action, HomeAssistant and LitElement should return expected html', () => {      
        const entity: RoomCardEntity = {
            stateObj: stateObj,
            show_icon: true,
            icon: 'mdi:table'
        };

        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: '',
            tap_action: 'more-info'
        };

        const result = renderTitle(entity, config, hass, element);
        const htmlResult = getRenderString(result);
        
        expect(htmlResult).toMatch('<div class="title clickable" @click="" @dblclick=""><div class="main-state entity" style=""> <state-badge class="icon-small " .stateObj="" .overrideIcon="mdi:table" .stateColor="" style="" ></state-badge> </div> </div>');
    })
});