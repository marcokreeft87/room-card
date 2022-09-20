import { PropertyValues } from 'lit';
import { createMock } from 'ts-auto-mock';
import { HassEntity } from 'home-assistant-js-websocket';
import { RoomCardConfig } from '../../src/types/room-card-types';
import { hasConfigOrEntitiesChanged } from '../../src/util';
import { StubHassEntity, StubHomeAssistant } from '../testdata';
import { HomeAssistant } from 'custom-card-helpers';

describe('Testing util file function hasConfigOrEntitiesChanged', () => {
    const config : RoomCardConfig = {
        entityIds: [],
        type: ''
    };

    test('Passing PropertyValues with config should return true', () => {
        const props : PropertyValues = new Map([['config', config]]);

        expect(hasConfigOrEntitiesChanged(config, props)).toBe(true);
    }),
    test('Passing PropertyValues empty and no oldHass should return true', () => {
        const props : PropertyValues = new Map();

        expect(hasConfigOrEntitiesChanged(config, props)).toBe(false);
    }),
    test('Passing PropertyValues with _hass and no changes should return false', () => {
        StubHassEntity.entity_id = 'sensor.test_entity';
        StubHassEntity.state = 'hide';
        StubHassEntity.attributes = {
            'show_state': 'show'
        }

        StubHomeAssistant.states = { 
            'sensor.test_entity': StubHassEntity
        };

        config.hass = StubHomeAssistant;
        const props : PropertyValues = new Map([['_hass', StubHomeAssistant]]);
        
        expect(hasConfigOrEntitiesChanged(config, props)).toBe(false);
    }),
    test('Passing PropertyValues with _hass and changes should return true', () => {
        StubHassEntity.entity_id = 'sensor.test_entity';
        StubHassEntity.state = 'hide';

        const oldHass = StubHomeAssistant;
        oldHass.states = { 
            'sensor.test_entity': StubHassEntity
        };

        const changedEntity = createMock<HassEntity>()
        changedEntity.entity_id = 'sensor.test_entity';
        changedEntity.state = 'show';
        const newHass = createMock<HomeAssistant>();
        newHass.states = { 
            'sensor.test_entity': changedEntity
        };

        config.hass = newHass;
        config.entityIds = [ StubHassEntity.entity_id ];
        const props : PropertyValues = new Map([['_hass', oldHass]]);
        
        expect(hasConfigOrEntitiesChanged(config, props)).toBe(true);
    }),
    test('Passing PropertyValues with _hass and no changes should return false', () => {
        StubHassEntity.entity_id = 'sensor.test_entity';
        StubHassEntity.state = 'hide';

        StubHomeAssistant.states = { 
            'sensor.test_entity': StubHassEntity
        };

        config.hass = StubHomeAssistant;
        config.entityIds = [ StubHassEntity.entity_id ];
        const props : PropertyValues = new Map([['_hass', StubHomeAssistant]]);
        
        expect(hasConfigOrEntitiesChanged(config, props)).toBe(false);
    })
})

