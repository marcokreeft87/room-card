import { HomeAssistant } from 'custom-card-helpers';
import { LitElement } from "lit";
import { createMock } from "ts-auto-mock";
import { renderMainEntity } from "../../src/entity";
import { HomeAssistantEntity, RoomCardConfig, RoomCardEntity } from "../../src/types/room-card-types";
import { getRenderString } from "../utils";

describe('Testing entity file function renderMainEntity', () => {
    const hass = createMock<HomeAssistant>();
    const stateObj = createMock<HomeAssistantEntity>();
    const element: LitElement = createMock<LitElement>();
    stateObj.entity_id = 'light.test_entity';
    stateObj.state = 'on';
    
    test('Passing  no RoomCardEntity, RoomcardConfig, HomeAssistant and LitElement should return null', () => {      
        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: ''
        };

        expect(renderMainEntity(undefined, config, hass, element)).toBeNull();
    }),
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
    }),
    test('Passing RoomCardEntity, RoomcardConfig, HomeAssistant and LitElement expected html without state', () => {      
        
        const entity: RoomCardEntity = {
            stateObj: stateObj,            
            show_state: false
        };

        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: ''
        };

        const result = renderMainEntity(entity, config, hass, element);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<div class="main-state entity" style="" @click="" @dblclick=""> </div>');
    }),
    test('Passing RoomCardEntity, RoomcardConfig, HomeAssistant and LitElement with icon expected html with icon', () => {      
        
        const entity: RoomCardEntity = {
            stateObj: stateObj
        };

        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: '',
            show_icon: true,
            icon: 'mdi:desk'
        };

        const result = renderMainEntity(entity, config, hass, element);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<div class="main-state entity" style="" @click="" @dblclick=""> <state-badge class="icon-small main-icon" .stateObj="" .overrideIcon="mdi:desk" .stateColor="" style="" ></state-badge> </div>');
    }),
    test('Passing RoomCardEntity with icon, RoomcardConfig, HomeAssistant and LitElement with icon expected html with icon', () => {      
        
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

        const result = renderMainEntity(entity, config, hass, element);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<div class="main-state entity" style="" @click="" @dblclick=""> <state-badge class="icon-small " .stateObj="" .overrideIcon="mdi:table" .stateColor="" style="" ></state-badge> </div>');
    }),
    test('Passing RoomCardEntity, RoomcardConfig, HomeAssistant and LitElement with empty entities', () => {      
        
        const entity: RoomCardEntity = {
            stateObj: stateObj
        };

        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: '',
            show_icon: true,
            entities: []
        };

        const result = renderMainEntity(entity, config, hass, element);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<div class="main-state entity" style="" @click="" @dblclick=""> <state-badge class="icon-small main-icon" .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge> </div>');
    })
});