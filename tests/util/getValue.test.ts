import { getValue } from '../../src/util';
import { StubRoomCardEntity } from '../testdata';

describe('Testing util file function getValue', () => {
    test('getValue: Passing RoomCardEntity with state on and no attribute should return on', () => {
        StubRoomCardEntity.stateObj.state = 'on';
        expect(getValue(StubRoomCardEntity)).toBe(StubRoomCardEntity.stateObj.state);
    }),
    test('getValue: Passing RoomCardEntity with state on and attribute "testattribute" should return test', () => {
        StubRoomCardEntity.stateObj.state = 'on';
        StubRoomCardEntity.attribute = 'testattribute';
        StubRoomCardEntity.stateObj.attributes['testattribute'] = 'test'
        expect(getValue(StubRoomCardEntity)).toBe('test');
    }),
    test('getValue: Passing RoomCardEntity with state on and nonexisting attribute should return undefined', () => {
        StubRoomCardEntity.stateObj.state = 'on';
        StubRoomCardEntity.attribute = 'nonexisting';
        StubRoomCardEntity.stateObj.attributes['testattribute'] = 'test'
        expect(getValue(StubRoomCardEntity)).toBe(undefined);
    })
})
