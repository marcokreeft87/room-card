import { UNAVAILABLE } from '../../src/lib/constants';
import { HideIfConfig } from '../../src/types/room-card-types';
import { hideIf } from '../../src/util';
import { StubHomeAssistant, StubRoomCardEntity } from '../testdata';

describe('Testing util file function hideIf', () => {
    test('hideIf: Passing RoomCardEntity with state unavailable and HomeAssistant should return true', () => {
        StubRoomCardEntity.hide_unavailable = true;
        StubRoomCardEntity.stateObj.state = UNAVAILABLE;
        expect(hideIf(StubRoomCardEntity, StubHomeAssistant)).toBe(true);
    }),
    test('hideIf: Passing RoomCardEntity with hide_if undefined and HomeAssistant should return false', () => {
        StubRoomCardEntity.hide_unavailable = false;
        StubRoomCardEntity.hide_if = undefined;
        expect(hideIf(StubRoomCardEntity, StubHomeAssistant)).toBe(false);
    })//, almost done
    // test('hideIf: Passing RoomCardEntity with hide_if and HomeAssistant should return false', () => {
    //     StubRoomCardEntity.hide_unavailable = false;
    //     StubRoomCardEntity.stateObj.attributes['hide_attribute'] = 'hide';

    //     StubRoomCardEntity.hide_if = {
    //         conditions: [{
    //             condition: 'equals',
    //             value: 'hide',
    //             attribute: 'hide_attribute'
    //         }]
    //     } as HideIfConfig;
    //     expect(hideIf(StubRoomCardEntity, StubHomeAssistant)).toBe(true);
    // })
})

