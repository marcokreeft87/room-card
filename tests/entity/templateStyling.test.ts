import { HomeAssistant } from 'custom-card-helpers';
import { createMock } from 'ts-auto-mock';
import { HassEntity } from 'home-assistant-js-websocket';
import { templateStyling } from '../../src/entity';
import { HomeAssistantEntity, RoomCardConfig } from '../../src/types/room-card-types';

describe('Testing entity file function templateStyling', () => {
    const hass = createMock<HomeAssistant>();
    const stateObj = createMock<HomeAssistantEntity>();

    test.each`
    state | expected
    ${'18'}  ${'color:red'}   
    ${'80'}  ${'color:green'}
    ${'60'}  ${'color:orange'}
    `('Passing config with icon template icon should return expected string', ({ state, expected }) => {    
        const hassEntity = createMock<HassEntity>();
        hassEntity.state = '10';
        hassEntity.attributes['check'] = 15;
        hass.states = {
            'sensor.check_entity': hassEntity
        }

        stateObj.entity_id = 'input_boolean.test_entity';
        stateObj.state = state;
        const config: RoomCardConfig = {
            entityIds: [],
            type: '',
            show_icon: true,
            icon: {
                template: {
                    styles: "if (entity.state >= 70) return 'color:green';  else if (entity.state >= 20) return 'color:orange';  else return 'color:red';"
                }
            }
        };

        expect(templateStyling(stateObj, config, hass)).toBe(expected);
    }),
    test.each`
    iconObj
    ${undefined} 
    ${{ template: undefined }}} 
    ${{ template: { styles: undefined } }}} 
    `('Passing config with icon template should return expected string', ({iconObj}) => {    
        const hassEntity = createMock<HassEntity>();
        hassEntity.state = '10';
        hassEntity.attributes['check'] = 15;
        hass.states = {
            'sensor.check_entity': hassEntity
        }

        stateObj.entity_id = 'input_boolean.test_entity';
        stateObj.state = '10';
        const config: RoomCardConfig = {
            entityIds: [],
            type: '',
            show_icon: true,
            icon: iconObj
        };

        expect(templateStyling(stateObj, config, hass)).toBeNull();
    })
})

