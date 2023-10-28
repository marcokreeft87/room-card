import { createMock } from 'ts-auto-mock';
import { HassEntity } from 'home-assistant-js-websocket';
import { ConditionOption, RoomCardLovelaceCardConfig } from '../../src/types/room-card-types';
import { hideIfCard } from '../../src/hide';
import { StubHomeAssistant } from '../testdata';

describe('Testing util file function hideIfCard', () => {
    const card: RoomCardLovelaceCardConfig = createMock<RoomCardLovelaceCardConfig>();
    const hassEntity: HassEntity = createMock<HassEntity>();

    test('Passing RoomCardLovelaceCardConfig without hide_if and HomeAssistant should return false', () => {
        expect(hideIfCard(card, StubHomeAssistant)).toBeFalsy();
    }),
    test('Passing RoomCardLovelaceCardConfig with hide_if and HomeAssistant should return true', () => {
        hassEntity.state = 'on'
        StubHomeAssistant.states = { 
            'sensor.test_entity': hassEntity
        };

        card.hide_if = {
            conditions: [{
                condition: ConditionOption.Equals,
                entity: 'sensor.test_entity',
                value: 'on'
            }]
        }

        expect(hideIfCard(card, StubHomeAssistant)).toBeTruthy();
    }),
    test('Passing RoomCardLovelaceCardConfig with hide_if without conditions and HomeAssistant should return false', () => {
        
        card.hide_if = {
            conditions: undefined
        }

        expect(hideIfCard(card, StubHomeAssistant)).toBeFalsy();
    }),
    test('Passing RoomCardLovelaceCardConfig with hide_if with empty conditions and HomeAssistant should return false', () => {
        
        card.hide_if = {
            conditions: []
        }

        expect(hideIfCard(card, StubHomeAssistant)).toBeFalsy();
    }),
    test('Passing RoomCardLovelaceCardConfig with hide_if and HomeAssistant should return true', () => {
        hassEntity.state = 'on'
        hassEntity.attributes['test'] = 'money';
        StubHomeAssistant.states = { 
            'sensor.test_entity': hassEntity
        };

        card.hide_if = {
            conditions: [{
                condition: ConditionOption.Equals,
                entity: 'sensor.test_entity',
                attribute: 'test',
                value: 'money'
            }]
        }

        expect(hideIfCard(card, StubHomeAssistant)).toBeTruthy();
    }),
    test('Passing RoomCardLovelaceCardConfig with hide_if boolean value and HomeAssistant should return false', () => {
        hassEntity.state = 'on'
        hassEntity.attributes['test'] = true;
        StubHomeAssistant.states = { 
            'sensor.test_entity': hassEntity
        };

        card.hide_if = {
            conditions: [{
                condition: ConditionOption.Equals,
                entity: 'sensor.test_entity',
                attribute: 'test',
                value: true
            }]
        }

        expect(hideIfCard(card, StubHomeAssistant)).toBeFalsy();
    }),
    test('Passing RoomCardLovelaceCardConfig with hide_if not matching and HomeAssistant should return false', () => {
        hassEntity.state = 'on'
        hassEntity.attributes['test'] = 'money';
        StubHomeAssistant.states = { 
            'sensor.test_entity': hassEntity
        };

        card.hide_if = {
            conditions: [{
                condition: ConditionOption.Equals,
                entity: 'sensor.test_entity',
                attribute: 'test',
                value: 'paper'
            }]
        }

        expect(hideIfCard(card, StubHomeAssistant)).toBeFalsy();
    }),
    test('Passing RoomCardEntity with hide_if and HomeAssistant should return false', () => {
        hassEntity.state = 'hide';
        hassEntity.attributes['hide_attribute'] = 'hide';
        StubHomeAssistant.states = { 
            'sensor.test_entity': hassEntity
        };

        card.entity = 'sensor.test_entity';
        card.hide_if = {
            conditions: [{
                condition: ConditionOption.Equals,
                value: 'show',
                attribute: 'hide_attribute'
            }]
        };
        expect(hideIfCard(card, StubHomeAssistant)).toBe(false);
    })
});