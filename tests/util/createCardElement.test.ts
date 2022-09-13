import { LovelaceCardConfig } from 'custom-card-helpers';
import { createMock } from 'ts-auto-mock';
import { createCardElement } from '../../src/util';
import { StubHassEntity, StubHomeAssistant } from '../testdata';

describe('Testing util file function createCardElement', () => {
    test('Passing LovelaceCardConfig with show_states and hass should return undefined', () => {
        const cardConfig = createMock<LovelaceCardConfig>();
        cardConfig.show_states = 'on';
        cardConfig.entity = 'sensor.test_entity';

        StubHassEntity.entity_id = 'sensor.test_entity';
        StubHassEntity.state = 'off';
        StubHomeAssistant.states = { 
            'sensor.test_entity': StubHassEntity
        };

        expect(createCardElement(cardConfig, StubHomeAssistant)).toBe(undefined);
    }),
    test('Passing LovelaceCardConfig with show_states and hass should return null', () => {
        const cardConfig = createMock<LovelaceCardConfig>();
        cardConfig.type = "entities";

        const result = createCardElement(cardConfig, StubHomeAssistant);

        expect(result?.outerHTML).toBe('<hui-entities-card style="box-shadow: none; border-radius: 0;"></hui-entities-card>');
    })
})

