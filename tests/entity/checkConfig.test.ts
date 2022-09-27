import { checkConfig } from '../../src/entity';
import { RoomCardConfig } from '../../src/types/room-card-types';
import { StubHassEntity } from '../testdata';

describe('Testing entity file function checkConfig', () => {
    test('Passing empty RoomCardConfig should throw error', () => {   
        const config: RoomCardConfig = {
            entityIds: [],
            type: ''
        }

        expect(() => checkConfig(config)).toThrowError('Please define entities.');
    }),
    test('Passing RoomCardConfig with entities should not throw error', () => {   
        const config: RoomCardConfig = {
            entityIds: [],
            type: '',
            entities: [{
                stateObj: StubHassEntity
              }]
        }
        expect(() => { checkConfig(config); }).not.toThrowError('Please define entities.');
    }),
    test('Passing RoomCardConfig with info_entities should not throw error', () => {   
        const config: RoomCardConfig = {
            entityIds: [],
            type: '',
            info_entities: [{
                stateObj: StubHassEntity
              }]
        }
        expect(() => checkConfig(config)).not.toThrowError('Please define entities.');
    }),
    test('Passing RoomCardConfig with rows should not throw error', () => {   
        const config: RoomCardConfig = {
            entityIds: [],
            type: '',
            rows: [{
                entities: [{
                    stateObj: StubHassEntity
                  }]
              }]
        }
        expect(() => checkConfig(config)).not.toThrowError('Please define entities.');
    }),
    test('Passing RoomCardConfig with entities should not throw error', () => {   
        const config: RoomCardConfig = {
            entityIds: [],
            type: '',
            entities: [{
                stateObj: StubHassEntity
              }],
            info_entities: [{
                stateObj: StubHassEntity
              }],
            row: [{
                entities: [{
                    stateObj: StubHassEntity
                  }]
              }]
        }
        expect(() => checkConfig(config)).not.toThrowError('Please define entities.');
    })
})

