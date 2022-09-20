import { createMock } from 'ts-auto-mock';
import { HomeAssistant, NumberFormat, TimeFormat } from 'custom-card-helpers';
import { entityStateDisplay } from '../../src/entity';
import { HomeAssistantEntity, RoomCardEntity } from '../../src/types/room-card-types';
import { UNAVAILABLE } from '../../src/lib/constants';

beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    jest.spyOn(console, 'debug').mockImplementation(jest.fn());
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
});
describe('Testing entity file function entityStateDisplay', () => {
    const stateObj = createMock<HomeAssistantEntity>();
    const hass = createMock<HomeAssistant>();
    hass.localize = jest.fn();
    hass.locale = {
        language: 'NL', 
        number_format: NumberFormat.comma_decimal,
        time_format: TimeFormat.language
    }

    test('Passing hass and unavailable entity should return undefined', () => {  
        stateObj.state = UNAVAILABLE;
        const entity: RoomCardEntity = {
            stateObj: stateObj
        };
        
        expect(entityStateDisplay(hass, entity)).toBe(undefined);
        expect(hass.localize).toBeCalled();
    }),
    test('Passing hass and state on entity should return stateObj.state', () => {  
        stateObj.state = 'on';
        const entity: RoomCardEntity = {
            stateObj: stateObj
        };
        
        expect(entityStateDisplay(hass, entity)).toBe(stateObj.state);
    }),
    test.each`
    unit | attribute | attribute_value | expected
    ${'€'}  ${'money'}  ${'25'}  ${'25 €'}
    ${'€'}  ${'string_attribute'}  ${'test'}  ${'test €'}
    ${undefined}  ${'string_attribute'}  ${'test'}  ${'test'}    
    `('Passing hass and state on entity with unit should return stateObj.state', ({unit, attribute, attribute_value, expected}) => {  
        
        stateObj.state = 'on';
        stateObj.attributes[attribute] = attribute_value;
        const entity: RoomCardEntity = {
            stateObj: stateObj,
            attribute: attribute,
            unit: unit
        };
        
        expect(entityStateDisplay(hass, entity)).toBe(expected);
    }),
    test('Passing hass and state on entity with unit should return stateObj.state', () => {  
        
        stateObj.state = 'on';
        stateObj.attributes['string_attribute'] = 'test';
        const entity: RoomCardEntity = {
            stateObj: stateObj
        };
        
        expect(entityStateDisplay(hass, entity)).toBe(stateObj.state);
    }),
    test.each`
    format | state | expected
    ${'brightness'}  ${'77'}  ${'30 %'}
    ${'duration'}  ${'1000'}  ${'16:40'}
    ${'duration-m'}  ${'1000'}  ${'1'}
    ${'precision2'}  ${'2.2324'}  ${'2.23'}
    ${'kilo'}  ${'1000'}  ${'1'}
    ${'invert'}  ${'1000'}  ${'-1,000'}
    ${'position'}  ${'10'}  ${'90'}
    ${'position'}  ${'notanumber'}  ${'notanumber'}
    
    `('Passing config format should return expected formatted value', ({format, state, expected}) => {    
        
        stateObj.state = state;
        const entity: RoomCardEntity = {
            stateObj: stateObj,
            format: format
        };
        
        expect(entityStateDisplay(hass, entity)).toBe(expected);
    })
})