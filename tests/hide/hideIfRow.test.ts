import { createMock } from 'ts-auto-mock';
import { HassEntity } from 'home-assistant-js-websocket';
import { RoomCardRow } from '../../src/types/room-card-types';
import { hideIfRow } from '../../src/hide';
import { StubHomeAssistant } from '../testdata';

describe('Testing util file function hideIfRow', () => {
    const row: RoomCardRow = createMock<RoomCardRow>();
    const hassEntity: HassEntity = createMock<HassEntity>();

    test('Passing RoomCardRow without hide_if and HomeAssistant should return false', () => {
        expect(hideIfRow(row, StubHomeAssistant)).toBeFalsy();
    }),
    test('Passing RoomCardRow with hide_if and HomeAssistant should return true', () => {
        hassEntity.state = 'on'
        StubHomeAssistant.states = { 
            'sensor.test_entity': hassEntity
        };

        row.hide_if = {
            conditions: [{
                condition: 'equals',
                entity: 'sensor.test_entity',
                value: 'on'
            }]
        }

        expect(hideIfRow(row, StubHomeAssistant)).toBeTruthy();
    }),
    test('Passing RoomCardRow with hide_if without conditions and HomeAssistant should return false', () => {
        
        row.hide_if = {
            conditions: undefined
        }

        expect(hideIfRow(row, StubHomeAssistant)).toBeFalsy();
    }),
    test('Passing RoomCardRow with hide_if with empty conditions and HomeAssistant should return false', () => {
        
        row.hide_if = {
            conditions: []
        }

        expect(hideIfRow(row, StubHomeAssistant)).toBeFalsy();
    }),
    test('Passing RoomCardRow with hide_if and HomeAssistant should return true', () => {
        hassEntity.state = 'on'
        hassEntity.attributes['test'] = 'money';
        StubHomeAssistant.states = { 
            'sensor.test_entity': hassEntity
        };

        row.hide_if = {
            conditions: [{
                condition: 'equals',
                entity: 'sensor.test_entity',
                attribute: 'test',
                value: 'money'
            }]
        }

        expect(hideIfRow(row, StubHomeAssistant)).toBeTruthy();
    }),
    test('Passing RoomCardRow with hide_if boolean value and HomeAssistant should return false', () => {
        hassEntity.state = 'on'
        hassEntity.attributes['test'] = true;
        StubHomeAssistant.states = { 
            'sensor.test_entity': hassEntity
        };

        row.hide_if = {
            conditions: [{
                condition: 'equals',
                entity: 'sensor.test_entity',
                attribute: 'test',
                value: true
            }]
        }

        expect(hideIfRow(row, StubHomeAssistant)).toBeFalsy();
    }),
    test('Passing RoomCardRow with hide_if not matching and HomeAssistant should return false', () => {
        hassEntity.state = 'on'
        hassEntity.attributes['test'] = 'money';
        StubHomeAssistant.states = { 
            'sensor.test_entity': hassEntity
        };

        row.hide_if = {
            conditions: [{
                condition: 'equals',
                entity: 'sensor.test_entity',
                attribute: 'test',
                value: 'paper'
            }]
        }

        expect(hideIfRow(row, StubHomeAssistant)).toBeFalsy();
    })
});