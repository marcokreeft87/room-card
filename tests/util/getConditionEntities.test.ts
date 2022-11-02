import { createMock } from 'ts-auto-mock';
import { EntityCondition, RoomCardEntity } from '../../src/types/room-card-types';
import { getConditionEntities } from '../../src/util';
import { StubHomeAssistantEntity } from '../testdata';

describe('Testing util file function getConditionEntities', () => {
    test('Passing undefined should return empty array', () => {   
        expect(getConditionEntities(undefined)).toEqual([]);
    })//,
    // test('Passing undefined should return', () => {   
    //     const entities: RoomCardEntity[] = [{
    //         stateObj: StubHomeAssistantEntity,
    //         icon: {
    //             conditions: [undefined as EntityCondition]
    //         }
    //     }]
    //     expect(getConditionEntities(entities)).toEqual([]);
    // })
})  