/* eslint-disable @typescript-eslint/ban-types */
import { ActionConfig, HomeAssistant, NumberFormat, TimeFormat } from 'custom-card-helpers';
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
    const clearTimeoutFn = jest.spyOn(window, 'clearTimeout');        
    const setTimeoutFn = jest.spyOn(window, 'setTimeout');
            
    stateObj.state = 'on';
    stateObj.attributes.friendly_name = 'Test Entity';
    
    test('End should do nothing', async () => {   

        const entity: RoomCardEntity = createMock<RoomCardEntity>({
            stateObj: stateObj
        });
        
        const result = renderEntity(entity, hass, element);
        const endFn = result.values[2] as Function;

        const mouseEvent = createMock<MouseEvent>({
            preventDefault: jest.fn(),
            type: 'touchend'
        });
        
        endFn(mouseEvent);
        expect(setTimeoutFn).not.toHaveBeenCalled();
        expect(clearTimeoutFn).not.toHaveBeenCalled();
    }),
    test('Start function should set timer', () => {   

        const entity: RoomCardEntity = createMock<RoomCardEntity>({
            stateObj: stateObj
        });
        
        const result = renderEntity(entity, hass, element);
        const startFn = result.values[1] as Function;
        startFn();

        expect(setTimeoutFn).toHaveBeenCalled();

    }),
    test('End with left click function should clear timer', () => {   
        
        const clickHandler = jest.spyOn(entityModule, 'clickHandler');

        const entity: RoomCardEntity = createMock<RoomCardEntity>({
            stateObj: stateObj
        });
        
        const result = renderEntity(entity, hass, element);
        const endFn = result.values[2] as Function;

        const mouseEvent = createMock<MouseEvent>({
            preventDefault: jest.fn()
        });

        endFn(mouseEvent);

        expect(clearTimeoutFn).toHaveBeenCalled();
        expect(clickHandler).toHaveBeenCalled();
    }),
    test('End with double click function should fire dblclickhandler', () => {   
        
        const clickHandler = jest.spyOn(entityModule, 'dblClickHandler');

        const entity: RoomCardEntity = createMock<RoomCardEntity>({
            stateObj: stateObj,
            double_tap_action: createMock<ActionConfig>()
        });
        
        const result = renderEntity(entity, hass, element);
        const startFn = result.values[1] as Function;
        const endFn = result.values[2] as Function;

        const mouseEvent = createMock<MouseEvent>({
            preventDefault: jest.fn(),
            detail: 2,
            type: 'click'
        });
        
        startFn();            
        endFn(mouseEvent);
        expect(setTimeoutFn).toHaveBeenCalled();

        endFn(mouseEvent);        
        expect(clearTimeoutFn).toHaveBeenCalledTimes(4);
        expect(clickHandler).toHaveBeenCalled();
    }),
    test('End with double click function too slow should fire clickhandler', async () => {   
        
        const clickHandler = jest.spyOn(entityModule, 'clickHandler');

        const entity: RoomCardEntity = createMock<RoomCardEntity>({
            stateObj: stateObj,
            double_tap_action: createMock<ActionConfig>()
        });
        
        const result = renderEntity(entity, hass, element);
        const endFn = result.values[2] as Function;

        const mouseEvent = createMock<MouseEvent>({
            preventDefault: jest.fn(),
            detail: 1,
            type: 'click'
        });
         
        endFn(mouseEvent);
        expect(setTimeoutFn).toHaveBeenCalled();
        
        await new Promise((r) => setTimeout(r, 550));

        expect(clickHandler).toHaveBeenCalled();
    }),
    test('Hold should fire holdhandler', async () => {   

        const holdHandler = jest.spyOn(entityModule, 'holdHandler');
        const entity: RoomCardEntity = createMock<RoomCardEntity>({
            stateObj: stateObj
        });
        
        const result = renderEntity(entity, hass, element);
        const startFn = result.values[1] as Function;
        const endFn = result.values[2] as Function;

        const mouseEvent = createMock<MouseEvent>({
            preventDefault: jest.fn()
        });

        startFn();
        await new Promise((r) => setTimeout(r, 550));
        endFn(mouseEvent);

        expect(setTimeoutFn).toHaveBeenCalled();
        expect(holdHandler).toHaveBeenCalled();
    }),
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
        expect(htmlResult).toMatch('<div class="entity" style="color: red;" @mousedown="start" @mouseup="end" @touchstart="start" @touchend="end" @touchcancel="end"> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div>');
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
        expect(htmlResult).toMatch('<div class="entity" style="" @mousedown="start" @mouseup="end" @touchstart="start" @touchend="end" @touchcancel="end"> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div>');
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
        expect(htmlResult).toMatch('<div class="entity" style="" @mousedown="start" @mouseup="end" @touchstart="start" @touchend="end" @touchcancel="end"> <span>Test Entity</span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div>');
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
        expect(htmlResult).toMatch('<div class="entity" style="" @mousedown="start" @mouseup="end" @touchstart="start" @touchend="end" @touchcancel="end"> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> <span>on</span> </div>');
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
        expect(htmlResult).toMatch('<div class="entity" style="" @mousedown="start" @mouseup="end" @touchstart="start" @touchend="end" @touchcancel="end"> <span>Test Entity</span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> <span>on</span> </div>');
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
        
        expect(htmlResult).toMatch('<div class="entity" style="" @mousedown="start" @mouseup="end" @touchstart="start" @touchend="end" @touchcancel="end"> <span></span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="mdi:desk" .stateColor="" style="" ></state-badge></div> </div>');
    }),
    test.each`
    format | state | expected
    ${'brightness'}  ${'77'}  ${'30 %'}
    ${'duration'}  ${'1000'}  ${'16:40'}
    ${'duration-m'}  ${'1000'}  ${'1'}
    ${'precision2'}  ${'2,2324'}  ${'2,23'}
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
        
        expect(htmlResult).toMatch(`<div class="entity" style="" @mousedown="start" @mouseup="end" @touchstart="start" @touchend="end" @touchcancel="end"> <span></span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> <span>${expected}</span> </div>`);
    })
})