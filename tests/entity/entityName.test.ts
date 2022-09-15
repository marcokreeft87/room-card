import { createMock } from 'ts-auto-mock';
import { HassEntity } from 'home-assistant-js-websocket';
import { entityName } from '../../src/entity';
import { RoomCardEntity } from '../../src/types/room-card-types';
import { StubHassEntity } from '../testdata';

describe('Testing util file function computeEntity', () => {
    test('Passing RoomCardEntity with name should return entity name', () => {     
        const entity : RoomCardEntity = {
            name: 'Test entity',
            stateObj: StubHassEntity
        };
        expect(entityName(entity)).toBe(entity.name);
    }),
    test('Passing RoomCardEntity with entity should return friendly name', () => {     
        StubHassEntity.attributes.friendly_name = 'Test Entity Friendly'
        const entity : RoomCardEntity = {
            entity: 'sensor.test_entity',
            stateObj: StubHassEntity
        };
        expect(entityName(entity)).toBe(StubHassEntity.attributes.friendly_name);
    }),
    test('Passing RoomCardEntity with entity should return entity_id', () => {    
        const hassEntity = createMock<HassEntity>();
        hassEntity.entity_id = 'sensor.test_entity_id';
        const entity : RoomCardEntity = {
            entity: 'sensor.test_entity',
            stateObj: hassEntity
        };
        expect(entityName(entity)).toBe('test_entity_id');
    }),
    test('Passing RoomCardEntity with no config should return null', () => {    
        const hassEntity = createMock<HassEntity>();
        const entity : RoomCardEntity = {
            stateObj: hassEntity
        };
        expect(entityName(entity)).toBe(null);
    })
})

