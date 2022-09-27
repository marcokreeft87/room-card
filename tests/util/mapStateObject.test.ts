import { createMock } from 'ts-auto-mock';
import { RoomCardConfig } from '../../src/types/room-card-types';
import { mapStateObject } from '../../src/util';
import { StubHassEntity, StubHomeAssistant, StubRoomCardEntity } from '../testdata';

describe('Testing util file function mapStateObject', () => {
    const config = createMock<RoomCardConfig>();

    test('Passing RoomCardEntity should return entity with stateObj', () => {
        StubHassEntity.entity_id = 'sensor.test_entity';

        StubRoomCardEntity.entity = 'sensor.test_entity';
        StubHomeAssistant.states = { 
            'sensor.test_entity': StubHassEntity
        };

        expect(mapStateObject(StubRoomCardEntity, StubHomeAssistant, config)).toHaveProperty("stateObj", StubHassEntity);
    }),
    test('Passing RoomCardEntity should return entity with stateObj', () => {
        StubHassEntity.entity_id = 'sensor.test_entity';

        StubHomeAssistant.states = { 
            'sensor.test_entity': StubHassEntity
        };

        expect(mapStateObject(StubRoomCardEntity, StubHomeAssistant, config)).toHaveProperty("stateObj", StubHassEntity);
    }),
    test('Passing RoomCardEntity should return entity with stateObj', () => {
        StubHassEntity.entity_id = 'sensor.test_entity';

        StubHomeAssistant.states = { 
            'sensor.test_entity': StubHassEntity
        };

        expect(mapStateObject('sensor.test_entity', StubHomeAssistant, config)).toHaveProperty("stateObj", StubHassEntity);
    })
})

