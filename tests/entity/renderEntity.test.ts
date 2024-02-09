/* eslint-disable @typescript-eslint/ban-types */
import { ActionHandlerEvent, HomeAssistant, NumberFormat, TimeFormat } from 'custom-card-helpers';
import { createMock } from 'ts-auto-mock';
import { LitElement } from 'lit';
import { renderEntity } from '../../src/entity';
import * as entityModule from '../../src/entity';
import { HomeAssistantEntity, RoomCardEntity } from '../../src/types/room-card-types';
import { getRenderString } from '../utils';
import { UNAVAILABLE } from '../../src/lib/constants';

describe('Testing entity file function renderEntity', () => {
    const hass = createMock<HomeAssistant>();
    const stateObj = createMock<HomeAssistantEntity>();
    const element: LitElement = createMock<LitElement>();
            
    stateObj.state = 'on';
    stateObj.attributes.friendly_name = 'Test Entity';
    
    test('Passing entity with styles should return expected html', () => {   

        const entity: RoomCardEntity = createMock<RoomCardEntity>({
            stateObj: stateObj,
            show_state: false,
            show_name: false,
            styles: {
                color: 'red'
            },
            entity: 'sensor.test_entity'
        });
        
        const result = renderEntity(entity, hass, element);
        const htmlResult = getRenderString(result);
        expect(htmlResult).toMatch('<div class="entity" style="color: red;" @action=_handleAction .actionHandler=> <div><state-badge class="icon-small " .hass= .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div>');
    }),
    test('Passing entity show_state false and show_name false should return expected html', () => {   

        const entity: RoomCardEntity = createMock<RoomCardEntity>({
            stateObj: stateObj,
            show_state: false,
            show_name: false,
            entity: 'sensor.test_entity'
        });
        
        const result = renderEntity(entity, hass, element);
        const htmlResult = getRenderString(result);
        expect(htmlResult).toMatch('<div class="entity" style="" @action=_handleAction .actionHandler=> <div><state-badge class="icon-small " .hass= .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div>');
    }),
    test('Passing entity show_state false and show_name true should return expected html', () => {   

        const entity: RoomCardEntity = createMock<RoomCardEntity>({
            stateObj: stateObj,
            show_state: false,
            show_name: true,
            entity: 'sensor.test_entity'
        });
        
        const result = renderEntity(entity, hass, element);
        const htmlResult = getRenderString(result);
        expect(htmlResult).toMatch('<div class="entity" style="" @action=_handleAction .actionHandler=> <span>Test Entity</span> <div><state-badge class="icon-small " .hass= .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div>');
    }),
    test('Passing entity show_state and show_name false should return expected html', () => {   

        const entity: RoomCardEntity = createMock<RoomCardEntity>({
            stateObj: stateObj,
            show_state: true,
            show_name: false,
            entity: 'sensor.test_entity'
        });
        
        const result = renderEntity(entity, hass, element);
        const htmlResult = getRenderString(result);
        expect(htmlResult).toMatch('<div class="entity" style="" @action=_handleAction .actionHandler=> <div><state-badge class="icon-small " .hass= .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> <span>on</span> </div>');
    }),
    test('Passing entity show_state and show_name should return expected html', () => {   

        const entity: RoomCardEntity = createMock<RoomCardEntity>({
            stateObj: stateObj,
            show_state: true,
            show_name: true,
            entity: 'sensor.test_entity'
        });
        
        const result = renderEntity(entity, hass, element);
        const htmlResult = getRenderString(result);
        expect(htmlResult).toMatch('<div class="entity" style="" @action=_handleAction .actionHandler=> <span>Test Entity</span> <div><state-badge class="icon-small " .hass= .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> <span>on</span> </div>');
    }),
    test('Passing entity to be hidden should return null', () => {   
        
        stateObj.state = UNAVAILABLE;
        const entity: RoomCardEntity = createMock<RoomCardEntity>({
            stateObj: stateObj,
            hide_unavailable: true,
        });
        
        const result = renderEntity(entity, hass, element);
        expect(result).toBeNull();
    }),
    test('Passing entity without stateObj should return null', () => {   
        
        const entity: RoomCardEntity = createMock<RoomCardEntity>({
            stateObj: undefined
        });

        const result = renderEntity(entity, hass, element);
        expect(result).toBeNull();
    }),
    test('Passing entity without stateObj and icon should return expected html', () => {   
        
        stateObj.state = 'on';
        const entity: RoomCardEntity = createMock<RoomCardEntity>({
            stateObj: stateObj,
            show_icon: true,
            icon: 'mdi:desk'
        });

        const result = renderEntity(entity, hass, element);
        const htmlResult = getRenderString(result);
        
        expect(htmlResult).toMatch('<div class="entity" style="" @action=_handleAction .actionHandler=> <span></span> <div><state-badge class="icon-small " .hass= .stateObj="" .overrideIcon="mdi:desk" .stateColor="" style="" ></state-badge></div> </div>');
    }),
    test.each`
    format | state | expected
    ${'brightness'}  ${'77'}  ${'30 %'}
    ${'duration'}  ${'1000'}  ${'16:40'}
    ${'duration-m'}  ${'1000'}  ${'1'}
    ${'precision2'}  ${2.2324}  ${'2,23'}
    ${'kilo'}  ${'1000'}  ${'1'}
    ${'invert'}  ${'1000'}  ${'-1.000'}
    ${'position'}  ${'10'}  ${'90'}
    ${'position'}  ${'notanumber'}  ${'notanumber'}
    
    `('Passing RoomCardEntity and HomeAssistant with locale should return formatted value', ({format, state, expected}) => {    
        
        hass.localize = jest.fn();
        hass.locale = {
            language: 'NL', 
            number_format: NumberFormat.decimal_comma,
            time_format: TimeFormat.language
        }

        stateObj.state = state;
        const entity: RoomCardEntity = {
            stateObj: stateObj,
            format: format,
            show_state: true
        };
        
        const result = renderEntity(entity, hass, element);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch(`<div class="entity" style="" @action=_handleAction .actionHandler=> <span></span> <div><state-badge class="icon-small " .hass= .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> <span>${expected}</span> </div>`);
    }),
    test('Mouseclick should trigger action', () => {   
        
        const clickHandler = jest.spyOn(entityModule, 'clickHandler');

        stateObj.attributes['title'] = "Test title";
        const entity: RoomCardEntity = {
            stateObj: stateObj,
            show_icon: true,
            icon: 'mdi:table'
        };
        const result = renderEntity(entity, hass, element);
        const endFn = result.values[1] as Function;

        const mouseEvent = createMock<ActionHandlerEvent>({
            detail: {
                action: 'test'
            }
        });

        endFn(mouseEvent);

        expect(clickHandler).toHaveBeenCalled();
    })
})