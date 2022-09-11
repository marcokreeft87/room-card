// import { hideIf } from '../../src/util';
// import { UNAVAILABLE_STATES } from '../../src/lib/constants';
// import { StubRoomCardEntity } from '../testdata';

// describe('Testing util file function hideUnavailable', () => {
    
//     test('hideUnavailable: Passing RoomCardEntity with state on and hide_unavailable false should return true', () => {   
//         StubRoomCardEntity.stateObj.state = 'on';
//         StubRoomCardEntity.hide_unavailable = false;
//         expect(hideUnavailable(StubRoomCardEntity)).toBe(false);
//     }),
//     test('hideUnavailable: Passing RoomCardEntity with state on and hide_unavailable true should return true', () => {   
//         StubRoomCardEntity.stateObj.state = 'on';
//         StubRoomCardEntity.hide_unavailable = true;
//         expect(hideUnavailable(StubRoomCardEntity)).toBe(false);
//     }),
//     test('hideUnavailable: Passing RoomCardEntity with state unavailable hide_unavailable true should return true', () => {   
//         StubRoomCardEntity.stateObj.state = UNAVAILABLE_STATES[0];
//         StubRoomCardEntity.hide_unavailable = true;
//         expect(hideUnavailable(StubRoomCardEntity)).toBe(true);
//     }),    
//     test('hideUnavailable: Passing RoomCardEntity with state unavailable and hide_unavailable false should return false', () => {   
//         StubRoomCardEntity.stateObj.state = UNAVAILABLE_STATES[0];
//         StubRoomCardEntity.hide_unavailable = false;
//         expect(hideUnavailable(StubRoomCardEntity)).toBe(false);
//     })
// })

