import { createMock } from 'ts-auto-mock';
import { RoomCardEntity } from '../../src/types/room-card-types';
import { getEntity } from '../../src/util';
import { HassEntity } from 'home-assistant-js-websocket';

describe('Testing util file function getEntity', () => {
    test('Passing entity string should return entityId', () => {   
        expect(getEntity('sensor.entity_sensor')).toBe('sensor.entity_sensor');
    }),
    test('Passing entity object should return entityId', () => {   
        const entity: RoomCardEntity = {
            stateObj: createMock<HassEntity>(),
            entity: 'sensor.entity_sensor'
        };
        expect(getEntity(entity)).toBe('sensor.entity_sensor');
    }),
    test('Passing entity undefined should return null', () => {   
        expect(getEntity(undefined)).toBe(null);
    })
})  