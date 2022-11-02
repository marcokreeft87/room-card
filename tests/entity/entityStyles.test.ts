import { HomeAssistant } from 'custom-card-helpers';
import { createMock } from 'ts-auto-mock';
import { entityStyles } from '../../src/entity';
import { EntityStyles, HomeAssistantEntity, RoomCardAttributeTemplate } from '../../src/types/room-card-types';

describe('Testing entity file function computeEntity', () => {
    const stateObj = createMock<HomeAssistantEntity>();
    const hass = createMock<HomeAssistant>();

    test('Passing styles object should return style string', () => {  
        const styles: EntityStyles = {
            color: 'red',
            height: '100'
        }      
        expect(entityStyles(styles, stateObj, hass)).toBe('color: red;height: 100;');
    }),
    test.each`
    state | expected
    ${'off'}  ${'color: red'}
    ${'on'}  ${'color: blue'}
    `('Passing RoomCardAttributeTemplate should return style string', ({ state, expected }) => {  
        stateObj.state = state;
        const template: RoomCardAttributeTemplate = {
            template: "if (entity.state == 'off') return 'color: red'; else return 'color: blue';"
        }      
        expect(entityStyles(template, stateObj, hass)).toBe(expected);
    })
})