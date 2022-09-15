import { HomeAssistant } from 'custom-card-helpers';
import { createMock } from 'ts-auto-mock';
import { HassEntity } from 'home-assistant-js-websocket';
import { entityIcon } from '../../src/entity';
import { HomeAssistantEntity, RoomCardConfig } from '../../src/types/room-card-types';

describe('Testing util file function entityIcon', () => {
    const hass = createMock<HomeAssistant>();
    const stateObjIconNull = createMock<HomeAssistantEntity>();
    const stateObj = createMock<HomeAssistantEntity>();
    stateObj.attributes.icon = 'mdi:chair';

    test('Passing config without icon should return null', () => { 
        const config: RoomCardConfig = {
            entityIds: [],
            type: ''
        };
        
        expect(entityIcon(stateObjIconNull, config, hass)).toBe(null);
    }),
    test('Passing config with icon should return icon from attributes', () => {    
        
        const config: RoomCardConfig = {
            entityIds: [],
            type: ''
        };
        
        expect(entityIcon(stateObj, config, hass)).toBe(stateObj.attributes.icon);
    }),
    test('Passing config with icon but show_icon false should throw error', () => {    
        
        const config: RoomCardConfig = {
            entityIds: [],
            type: '',
            icon: 'mdi:chair'
        };
        
        expect(() => entityIcon(stateObj, config, hass)).toThrowError('Icon defined but show_icon is set to false or not defined. Please set show_icon to true');
    }),
    test('Passing config with icon state_on/state_off and stateObj not support domain should return undefined', () => {    
        
        stateObj.state = 'on';
        stateObj.entity_id = 'sensor.test_entity';
        const config: RoomCardConfig = {
            entityIds: [],
            type: '',
            show_icon: true,
            icon: {
                state_on: 'mdi:on-icon',
                state_off: 'mdi:off-icon',
            }
        };
        
        expect(entityIcon(stateObj, config, hass)).toBe(undefined);
    }),
    test('Passing config with icon string should return icon', () => {    
        
        stateObj.entity_id = 'input_boolean.test_entity';
        stateObj.state = 'on';
        const config: RoomCardConfig = {
            entityIds: [],
            type: '',
            show_icon: true,
            icon: 'mdi:desk'
        };
        
        expect(entityIcon(stateObj, config, hass)).toBe(config.icon);
    }),
    test('Passing config with icon state_on/state_off should return state_on icon', () => {    
        
        stateObj.entity_id = 'input_boolean.test_entity';
        stateObj.state = 'on';
        const config: RoomCardConfig = {
            entityIds: [],
            type: '',
            show_icon: true,
            icon: {
                state_on: 'mdi:on-icon',
                state_off: 'mdi:off-icon',
            }
        };
        
        expect(entityIcon(stateObj, config, hass)).toBe('mdi:on-icon');
    }),
    test.each`
    entity_id
    ${'light.test_entity'}
    ${'switch.test_entity'}
    ${'binary_sensor.test_entity'}
    ${'input_boolean.test_entity'}
    `('Passing config with icon state_on/state_off should return state_off icon', ({entity_id}) => {    
        
        stateObj.entity_id = entity_id;// 'input_boolean.test_entity';
        stateObj.state = 'off';
        const config: RoomCardConfig = {
            entityIds: [],
            type: '',
            show_icon: true,
            icon: {
                state_on: 'mdi:on-icon',
                state_off: 'mdi:off-icon',
            }
        };
        
        expect(entityIcon(stateObj, config, hass)).toBe('mdi:off-icon');
    }),
    test('Passing config with icon iconditions equals should return condition', () => {    
        
        stateObj.entity_id = 'input_boolean.test_entity';
        stateObj.state = 'off';
        const config: RoomCardConfig = {
            entityIds: [],
            type: '',
            show_icon: true,
            icon: {
                conditions: [{
                    condition: 'equals',
                    value: 'off',
                    icon: 'mdi:off-icon'
                }]
            }
        };
        
        expect(entityIcon(stateObj, config, hass)).toMatchObject({'condition': 'equals', 'icon': 'mdi:off-icon', 'value': 'off'});
    }),
    test('Passing config with icon iconditions below should return condition', () => {    
        
        stateObj.entity_id = 'input_boolean.test_entity';
        stateObj.state = '20';
        const config: RoomCardConfig = {
            entityIds: [],
            type: '',
            show_icon: true,
            icon: {
                conditions: [{
                    condition: 'below',
                    value: 30,
                    icon: 'mdi:30-icon'
                }]
            }
        };
        
        expect(entityIcon(stateObj, config, hass)).toMatchObject({'condition': 'below', 'icon': 'mdi:30-icon', 'value': 30});
    }),
    test('Passing config with icon iconditions above should return condition', () => {    
        
        stateObj.entity_id = 'input_boolean.test_entity';
        stateObj.state = '20';
        const config: RoomCardConfig = {
            entityIds: [],
            type: '',
            show_icon: true,
            icon: {
                conditions: [{
                    condition: 'above',
                    value: 10,
                    icon: 'mdi:10-icon'
                }]
            }
        };
        
        expect(entityIcon(stateObj, config, hass)).toMatchObject({'condition': 'above', 'icon': 'mdi:10-icon', 'value': 10});
    }),
    test('Passing config with multiple icon iconditions should return condition', () => {    
        
        stateObj.entity_id = 'input_boolean.test_entity';
        stateObj.state = '20';
        const config: RoomCardConfig = {
            entityIds: [],
            type: '',
            show_icon: true,
            icon: {
                conditions: [{
                    condition: 'above',
                    value: 10,
                    icon: 'mdi:10-icon'
                },{
                    condition: 'above',
                    value: 10,
                    icon: 'mdi:10-icon'
                }]
            }
        };
        
        expect(entityIcon(stateObj, config, hass)).toMatchObject({'condition': 'above', 'icon': 'mdi:10-icon', 'value': 10});
    }),
    test('Passing config with icon iconditions with entity should return condition', () => {    
        const hassEntity = createMock<HassEntity>();
        hassEntity.state = '15';
        hass.states = {
            'sensor.check_entity': hassEntity
        }

        stateObj.entity_id = 'input_boolean.test_entity';
        stateObj.state = '20';
        const config: RoomCardConfig = {
            entityIds: [],
            type: '',
            show_icon: true,
            icon: {
                conditions: [{
                    condition: 'above',
                    value: 10,
                    icon: 'mdi:10-icon',
                    entity: 'sensor.check_entity'
                }]
            }
        };
        
        expect(entityIcon(stateObj, config, hass)).toMatchObject({'condition': 'above', 'icon': 'mdi:10-icon', 'value': 10});
    }),
    test('Passing config with icon iconditions with entity not available should return undefined', () => {    
        const hassEntity = createMock<HassEntity>();
        hassEntity.state = '10';
        hass.states = {
            'sensor.check_entity': hassEntity
        }

        stateObj.entity_id = 'input_boolean.test_entity';
        stateObj.state = '20';
        const config: RoomCardConfig = {
            entityIds: [],
            type: '',
            show_icon: true,
            icon: {
                conditions: [{
                    condition: 'above',
                    value: 10,
                    icon: 'mdi:10-icon',
                    entity: 'sensor.check_entity'
                }]
            }
        };
        
        expect(entityIcon(stateObj, config, hass)).toBe(undefined);
    }),
    test('Passing config with icon iconditions with attribute should return condition', () => {    
        
        stateObj.entity_id = 'input_boolean.test_entity';
        stateObj.state = '20';
        stateObj.attributes['visibility'] = 15;
        const config: RoomCardConfig = {
            entityIds: [],
            type: '',
            show_icon: true,
            icon: {
                conditions: [{
                    condition: 'above',
                    value: 10,
                    icon: 'mdi:10-icon',
                    attribute: 'visibility'
                }]
            }
        };
        
        expect(entityIcon(stateObj, config, hass)).toMatchObject({'condition': 'above', 'icon': 'mdi:10-icon', 'value': 10});
    }),
    test('Passing config with icon iconditions with attribute should return condition', () => {    
        const hassEntity = createMock<HassEntity>();
        hassEntity.state = '10';
        hassEntity.attributes['check'] = 15;
        hass.states = {
            'sensor.check_entity': hassEntity
        }

        stateObj.entity_id = 'input_boolean.test_entity';
        stateObj.state = '20';
        const config: RoomCardConfig = {
            entityIds: [],
            type: '',
            show_icon: true,
            icon: {
                conditions: [{
                    condition: 'above',
                    value: 10,
                    icon: 'mdi:10-icon',
                    entity: 'sensor.check_entity',
                    attribute: 'check'
                }]
            }
        };
        
        expect(entityIcon(stateObj, config, hass)).toMatchObject({'condition': 'above', 'icon': 'mdi:10-icon', 'value': 10});
    })
})

