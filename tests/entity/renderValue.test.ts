import { HomeAssistant, NumberFormat, TimeFormat } from 'custom-card-helpers';
import { createMock } from 'ts-auto-mock';
import { renderValue } from '../../src/entity';
import { LAST_CHANGED, LAST_UPDATED } from '../../src/lib/constants';
import { HomeAssistantEntity, RoomCardEntity } from '../../src/types/room-card-types';
import { getRenderString } from '../utils';

describe('Testing util file function renderValue', () => {
    const hass = createMock<HomeAssistant>();
    const stateObj = createMock<HomeAssistantEntity>();
    hass.localize = jest.fn();
    hass.locale = {
        language: 'NL', 
        number_format: NumberFormat.comma_decimal,
        time_format: TimeFormat.language
    }

    test('Passing RoomCardEntity and HomeAssistant with toggle true should return toggle', () => {      
        
        const entity: RoomCardEntity = {
            toggle: true,
            stateObj: stateObj
        }

        const result = renderValue(entity, hass)
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<ha-entity-toggle .stateObj="" .hass=""></ha-entity-toggle>');
    }),
    test('Passing RoomCardEntity and HomeAssistant with show_icon should return icon', () => {      
        
        const entity: RoomCardEntity = {
            stateObj: stateObj,
            show_icon: true,
            icon: 'mdi:table'
        }

        const result = renderValue(entity, hass)
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<state-badge class="icon-small " .stateObj="" .overrideIcon="mdi:table" .stateColor="" style="" ></state-badge>');
    }),
    test.each`
    attribute 
    ${LAST_UPDATED}
    ${LAST_CHANGED}
    `('Passing RoomCardEntity and HomeAssistant should return date', ({ attribute }) => {      
        
        stateObj.last_changed = new Date(2022, 1, 1).toDateString();
        stateObj.last_updated = new Date(2022, 1, 1).toDateString();
        const entity: RoomCardEntity = {
            stateObj: stateObj,
            attribute:  attribute
        }

        const result = renderValue(entity, hass)
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<ha-relative-time .hass= .datetime=Tue Feb 01 2022 capitalize ></ha-relative-time>');
    }),
    test('Passing RoomCardEntity and HomeAssistant should return format', () => {      
        
        stateObj.state = new Date(2022, 1, 1).toDateString();
        const entity: RoomCardEntity = {
            stateObj: stateObj,
            format: 'date'
        }

        const result = renderValue(entity, hass)
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<hui-timestamp-display .hass= .ts= .format=date capitalize ></hui-timestamp-display>');
    }),
    test('Passing RoomCardEntity and HomeAssistant should not a date return value', () => {      
        
        stateObj.state = 'Test';
        const entity: RoomCardEntity = {
            stateObj: stateObj,
            format: 'date'
        }

        expect(renderValue(entity, hass)).toBe('Test');
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
    
    `('Passing RoomCardEntity and HomeAssistant should return formatted value', ({format, state, expected}) => {    
        
        stateObj.state = state;
        const entity: RoomCardEntity = {
            stateObj: stateObj,
            format: format
        };
        
        expect(renderValue(entity, hass)).toBe(expected);
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
        
        expect(renderValue(entity, hass)).toBe(expected);
    })
})

