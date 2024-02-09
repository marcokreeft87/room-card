import { ActionHandlerEvent, HomeAssistant, MoreInfoActionConfig, NavigateActionConfig } from 'custom-card-helpers';
import { LitElement } from "lit";
import { createMock } from "ts-auto-mock";
import { renderTitle } from "../../src/entity";
import { HomeAssistantEntity, RoomCardConfig, RoomCardEntity } from "../../src/types/room-card-types";
import { getRenderString } from "../utils";
import * as entityModule from '../../src/entity';

describe('Testing entity file function renderValue', () => {
    const hass = createMock<HomeAssistant>();
    const stateObj = createMock<HomeAssistantEntity>();
    const element: LitElement = createMock<LitElement>();
    stateObj.entity_id = 'light.test_entity';
    stateObj.state = 'on';
    
    test('Passing RoomCardEntity, RoomcardConfig, HomeAssistant and LitElement should return null', () => {      
        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: '',
            hide_title: true
        };

        const entity: RoomCardEntity = {
            stateObj: stateObj
        };

        expect(renderTitle(config, hass, element, entity)).toBeNull();
    }),
    test('Passing RoomCardEntity, RoomcardConfig, HomeAssistant and LitElement should return expected html', () => {      
        const entity: RoomCardEntity = {
            stateObj: stateObj,
            show_icon: true,
            icon: 'mdi:table'
        };

        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: '',
            tap_action: { } as MoreInfoActionConfig,
        };

        const result = renderTitle(config, hass, element, entity);
        const htmlResult = getRenderString(result);
        
        expect(htmlResult).toMatch('<div class="title clickable" @action=_handleAction .actionHandler=><div class="main-state entity" style=""> <state-badge class="icon-small " .hass= .stateObj="" .overrideIcon="mdi:table" .stateColor="" style="" ></state-badge> </div> </div>');
    }),
    test('Passing no RoomCardEntity, RoomcardConfig, HomeAssistant and LitElement should return expected html', () => {      
        
        const config: RoomCardConfig = {
            entityIds: ['light.test_entity'],
            type: '',
            tap_action: { action: 'more-info' } as MoreInfoActionConfig,
            double_tap_action: { action: 'more-info' } as MoreInfoActionConfig,
            hold_action: { action: 'more-info' } as MoreInfoActionConfig
        };

        const result = renderTitle(config, hass, element, undefined);
        const htmlResult = getRenderString(result);
        
        expect(htmlResult).toMatch('<div class="title clickable" @action=_handleAction .actionHandler=> </div>');
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
            tap_action: { } as MoreInfoActionConfig,
        };

        const result = renderTitle(config, hass, element, entity);
        const htmlResult = getRenderString(result);
        
        expect(htmlResult).toMatch('<div class="title clickable" @action=_handleAction .actionHandler=><div class="main-state entity" style=""> <state-badge class="icon-small " .hass= .stateObj="" .overrideIcon="mdi:table" .stateColor="" style="" ></state-badge> </div> </div>');
    }),
    test.each`
    state | expected
    ${'off'}  ${'Off'}
    ${'on'}  ${'Test title'}
    `('Passing RoomCardEntity, RoomcardConfig, HomeAssistant and LitElement should return expected html', ({ state, expected }) => {      
        stateObj.attributes['title'] = "Test title";
        stateObj.state = state;
        const entity: RoomCardEntity = {
            stateObj: stateObj,
            show_icon: true,
            icon: 'mdi:table'
        };

        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: '',
            tap_action: { } as MoreInfoActionConfig,
            title: {
                template: "if (entity.state == 'on') return entity.attributes.title; else return 'Off'; "
            }
        };

        const result = renderTitle(config, hass, element, entity);
        const htmlResult = getRenderString(result);
        
        expect(htmlResult).toMatch(`<div class="title clickable" @action=_handleAction .actionHandler=><div class="main-state entity" style=""> <state-badge class="icon-small " .hass= .stateObj="" .overrideIcon="mdi:table" .stateColor="" style="" ></state-badge> </div> ${expected}</div>`);
    }),
    test('Mouseclick should trigger action', () => {   
        
        const clickHandler = jest.spyOn(entityModule, 'clickHandler');

        stateObj.attributes['title'] = "Test title";
        const entity: RoomCardEntity = {
            stateObj: stateObj,
            show_icon: true,
            icon: 'mdi:table'
        };

        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: '',
            tap_action: { } as MoreInfoActionConfig,
            title: 'Test'
        };
        
        const result = renderTitle(config, hass, element, entity);
        
        // eslint-disable-next-line @typescript-eslint/ban-types
        const endFn = result.values[1] as Function;

        const mouseEvent = createMock<ActionHandlerEvent>({
            detail: {
                action: 'test'
            }
        });

        endFn(mouseEvent);

        expect(clickHandler).toHaveBeenCalled();
    }),
    test('Mouseclick should trigger action', () => {   
        
        const clickHandler = jest.spyOn(entityModule, 'clickHandler');

        stateObj.attributes['title'] = "Test title";
        
        const config: RoomCardConfig = {
            entityIds: ['light.test_entity'],
            type: '',
            tap_action: { } as MoreInfoActionConfig,
            title: 'Test'
        };
        
        const result = renderTitle(config, hass, element, undefined);
        
        // eslint-disable-next-line @typescript-eslint/ban-types
        const endFn = result.values[1] as Function;

        const mouseEvent = createMock<ActionHandlerEvent>({
            detail: {
                action: 'test'
            }
        });

        endFn(mouseEvent);

        expect(clickHandler).toHaveBeenCalled();
    }),
    test('Mouseclick should trigger action', () => {   
        
        const clickHandler = jest.spyOn(entityModule, 'clickHandler');
        const entity: RoomCardEntity = {
            stateObj: stateObj,
            show_icon: true,
            icon: 'mdi:table',
            tap_action: { action: 'navigate' } as NavigateActionConfig
        };

        stateObj.attributes['title'] = "Test title";
        
        const config: RoomCardConfig = {
            entityIds: ['light.test_entity'],
            type: '',
            tap_action: { action: 'navigate' } as NavigateActionConfig,
            title: 'Test'
        };
        
        const result = renderTitle(config, hass, element, entity);
        
        // eslint-disable-next-line @typescript-eslint/ban-types
        const endFn = result.values[1] as Function;

        const mouseEvent = createMock<ActionHandlerEvent>({
            detail: {
                action: 'test'
            }
        });

        endFn(mouseEvent);

        expect(clickHandler).toHaveBeenCalled();
    })
});