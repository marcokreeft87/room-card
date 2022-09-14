import { checkConfig } from '../../src/entity';
import { RoomCardConfig } from '../../src/types/room-card-types';

describe('Testing util file function checkConfig', () => {
    test('Passing empty RoomCardConfig should throw error', () => {   
        const config: RoomCardConfig = {
            entityIds: [],
            type: ''
        }
        expect(() => checkConfig(config)).toThrowError('Please define entities.');
    })
})

