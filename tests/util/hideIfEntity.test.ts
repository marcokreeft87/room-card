import { createMock } from 'ts-auto-mock';
import { HassEntity } from 'home-assistant-js-websocket';
import { UNAVAILABLE } from '../../src/lib/constants';
import { HideIfConfig } from '../../src/types/room-card-types';
import { hideIfEntity } from '../../src/util';
import { StubHassEntity, StubHomeAssistant, StubRoomCardEntity } from '../testdata';

describe('Testing util file function hideIfEntity', () => {
    test('Passing RoomCardEntity with state unavailable and HomeAssistant should return true', () => {
        StubRoomCardEntity.hide_unavailable = true;
        StubRoomCardEntity.stateObj.state = UNAVAILABLE;
        expect(hideIfEntity(StubRoomCardEntity, StubHomeAssistant)).toBe(true);
    }),
    test('Passing RoomCardEntity with hide_if undefined and HomeAssistant should return false', () => {
        StubRoomCardEntity.hide_unavailable = false;
        StubRoomCardEntity.hide_if = undefined;
        expect(hideIfEntity(StubRoomCardEntity, StubHomeAssistant)).toBe(false);
    }),
    test('Passing RoomCardEntity with hide_if and HomeAssistant should return true', () => {
        StubRoomCardEntity.hide_unavailable = false;
        StubRoomCardEntity.stateObj.state = 'hide';
        StubRoomCardEntity.stateObj.attributes['hide_attribute'] = 'hide';

        StubRoomCardEntity.hide_if = {
            conditions: [{
                condition: 'equals',
                value: 'hide',
                attribute: 'hide_attribute'
            }]
        } as HideIfConfig;
        expect(hideIfEntity(StubRoomCardEntity, StubHomeAssistant)).toBe(true);
    }),
    test('Passing RoomCardEntity with hide_if and HomeAssistant should return false', () => {
        StubRoomCardEntity.hide_unavailable = false;
        StubRoomCardEntity.stateObj.state = 'hide';
        StubRoomCardEntity.stateObj.attributes['hide_attribute'] = 'hide';

        StubRoomCardEntity.hide_if = {
            conditions: [{
                condition: 'equals',
                value: 'show',
                attribute: 'hide_attribute'
            }]
        } as HideIfConfig;
        expect(hideIfEntity(StubRoomCardEntity, StubHomeAssistant)).toBe(false);
    }),
    test('Passing RoomCardEntity with hide_if entity and HomeAssistant should return true', () => {
        StubRoomCardEntity.hide_unavailable = false;
        StubRoomCardEntity.entity = 'sensor.test_entity'

        StubHassEntity.entity_id = 'sensor.test_entity';
        StubHassEntity.state = 'hide';

        StubHomeAssistant.states = { 
            'sensor.test_entity': StubHassEntity
        };

        StubRoomCardEntity.hide_if = {
            conditions: [{
                condition: 'equals',
                value: 'hide',
                entity: 'sensor.test_entity'
            }]
        } as HideIfConfig;
        expect(hideIfEntity(StubRoomCardEntity, StubHomeAssistant)).toBe(true);
    }),
    test('Passing RoomCardEntity with hide_if entity and HomeAssistant should return true', () => {
        StubRoomCardEntity.hide_unavailable = false;
        StubRoomCardEntity.entity = 'sensor.test_entity'

        StubHassEntity.entity_id = 'sensor.test_entity';
        StubHassEntity.state = 'hide';

        const otherEntity = createMock<HassEntity>();        
        otherEntity.entity_id = 'sensor.test_entity2';
        otherEntity.state = 'hide';
        otherEntity.attributes = {
            'show_state' : 'hide'
        }

        StubHomeAssistant.states = { 
            'sensor.test_entity': StubHassEntity,
            'sensor.test_entity2': otherEntity,
        };

        StubRoomCardEntity.hide_if = {
            conditions: [{
                condition: 'equals',
                value: 'hide',
                entity: 'sensor.test_entity2',
                attribute: 'show_state'
            }]
        } as HideIfConfig;
        expect(hideIfEntity(StubRoomCardEntity, StubHomeAssistant)).toBe(true);
    }),
    test('Passing RoomCardEntity with hide_if entity and HomeAssistant should return true', () => {
        StubRoomCardEntity.hide_unavailable = false;
        StubRoomCardEntity.entity = 'sensor.test_entity'

        StubHassEntity.entity_id = 'sensor.test_entity';
        StubHassEntity.state = '1';

        StubHomeAssistant.states = { 
            'sensor.test_entity': StubHassEntity
        };

        StubRoomCardEntity.hide_if = {
            conditions: [{
                condition: 'above',
                value: '0',
                entity: 'sensor.test_entity'
            },
            {
                condition: 'below',
                value: '0',
                entity: 'sensor.test_entity'
            }]
        } as HideIfConfig;
        expect(hideIfEntity(StubRoomCardEntity, StubHomeAssistant)).toBe(true);
    }),
    test('Passing RoomCardEntity with hide_if entity and HomeAssistant should return true', () => {
        StubRoomCardEntity.hide_unavailable = false;
        StubRoomCardEntity.entity = 'sensor.test_entity'

        StubHassEntity.entity_id = 'sensor.test_entity';
        StubHassEntity.state = '1';

        StubHomeAssistant.states = { 
            'sensor.test_entity': StubHassEntity
        };

        StubRoomCardEntity.hide_if = {
            conditions: [{
                condition: 'above',
                value: '1',
                entity: 'sensor.test_entity'
            },
            {
                condition: 'below',
                value: '2',
                entity: 'sensor.test_entity'
            }]
        } as HideIfConfig;
        expect(hideIfEntity(StubRoomCardEntity, StubHomeAssistant)).toBe(true);
    }),
    test('Passing RoomCardEntity with hide_if entity and HomeAssistant should return true', () => {
        StubRoomCardEntity.hide_unavailable = false;
        StubRoomCardEntity.entity = 'sensor.test_entity'

        StubHassEntity.entity_id = 'sensor.test_entity';
        StubHassEntity.state = 'hide';

        StubHomeAssistant.states = { 
            'sensor.test_entity': StubHassEntity
        };

        StubRoomCardEntity.hide_if = {
            conditions: [{
                condition: 'not_equals',
                value: 'show',
                entity: 'sensor.test_entity'
            }]
        } as HideIfConfig;
        expect(hideIfEntity(StubRoomCardEntity, StubHomeAssistant)).toBe(true);
    }),
    test('Passing RoomCardEntity with hide_if entity and HomeAssistant should return false', () => {
        StubRoomCardEntity.hide_unavailable = false;
        StubRoomCardEntity.entity = 'sensor.test_entity'

        StubHassEntity.entity_id = 'sensor.test_entity';
        StubHassEntity.state = 'show';

        StubHomeAssistant.states = { 
            'sensor.test_entity': StubHassEntity
        };

        StubRoomCardEntity.hide_if = {
            conditions: [{
                condition: 'equals',
                value: 'hide',
                entity: 'sensor.test_entity'
            }]
        } as HideIfConfig;
        expect(hideIfEntity(StubRoomCardEntity, StubHomeAssistant)).toBe(false);
    }),
    test('Passing RoomCardEntity with hide_if entity attribute and HomeAssistant should return true', () => {
        StubRoomCardEntity.hide_unavailable = false;
        StubRoomCardEntity.entity = 'sensor.test_entity'

        StubHassEntity.entity_id = 'sensor.test_entity';
        StubHassEntity.state = 'hide';
        StubHassEntity.attributes = {
            'show_state': 'hide'
        }

        StubHomeAssistant.states = { 
            'sensor.test_entity': StubHassEntity
        };

        StubRoomCardEntity.hide_if = {
            conditions: [{
                condition: 'equals',
                value: 'hide',
                entity: 'sensor.test_entity',
                attribute: 'show_state'
            }]
        } as HideIfConfig;
        expect(hideIfEntity(StubRoomCardEntity, StubHomeAssistant)).toBe(true);
    }),
    test('Passing RoomCardEntity with hide_if entity attribute and HomeAssistant should return false', () => {
        StubRoomCardEntity.hide_unavailable = false;
        StubRoomCardEntity.entity = 'sensor.test_entity'

        StubHassEntity.entity_id = 'sensor.test_entity';
        StubHassEntity.state = 'hide';
        StubHassEntity.attributes = {
            'show_state': 'show'
        }

        StubHomeAssistant.states = { 
            'sensor.test_entity': StubHassEntity
        };

        StubRoomCardEntity.hide_if = {
            conditions: [{
                condition: 'equals',
                value: 'hide',
                entity: 'sensor.test_entity',
                attribute: 'show_state'
            }]
        } as HideIfConfig;
        expect(hideIfEntity(StubRoomCardEntity, StubHomeAssistant)).toBe(false);
    }),
    test('Passing RoomCardEntity with hide_if no conditions and HomeAssistant should return false', () => {
        StubRoomCardEntity.hide_unavailable = false;
        StubRoomCardEntity.stateObj.state = 'hide';
        StubRoomCardEntity.stateObj.attributes['hide_attribute'] = 'hide';

        StubRoomCardEntity.hide_if = {
            conditions: undefined
        } as HideIfConfig;
        expect(hideIfEntity(StubRoomCardEntity, StubHomeAssistant)).toBe(false);
    })
})