import { LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { createMock } from 'ts-auto-mock';
import { createCardElement } from '../../src/util';
import { StubHassEntity, StubHomeAssistant } from '../testdata';

describe('Testing util file function createCardElement', () => {
    let spy: jest.SpyInstance<HTMLElement, [tagName: string, options?: ElementCreationOptions | undefined]>;
    beforeEach(() => {
        spy = jest.spyOn(document, 'createElement');
    });
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
    })
    test('Passing LovelaceCardConfig with show_states and hass should return entities card', () => {
        const cardConfig = createMock<LovelaceCardConfig>();
        cardConfig.type = 'entities';

        let htmlElement = document.createElement('hui-entities-card') as LovelaceCard;
        htmlElement.setConfig = () => { htmlElement.hass = StubHomeAssistant };

        spy.mockReturnValueOnce(htmlElement);
        const result = createCardElement(cardConfig, StubHomeAssistant);

        expect(result?.outerHTML).toBe('<hui-entities-card style="box-shadow: none; border-radius: 0;"></hui-entities-card>');
    }),
    test('Passing LovelaceCardConfig with show_states and hass should return divider card', () => {
        const cardConfig = createMock<LovelaceCardConfig>();
        cardConfig.type = 'divider';

        let htmlElement = document.createElement('hui-divider-row') as LovelaceCard;
        htmlElement.setConfig = () => { htmlElement.hass = StubHomeAssistant };

        spy.mockReturnValueOnce(htmlElement);
        const result = createCardElement(cardConfig, StubHomeAssistant);

        expect(result?.outerHTML).toBe('<hui-divider-row style="box-shadow: none; border-radius: 0;"></hui-divider-row>');
    }),
    test('Passing LovelaceCardConfig with show_states and hass should return room-card card', () => {
        const cardConfig = createMock<LovelaceCardConfig>();
        cardConfig.type = 'custom:room-card';

        let htmlElement = document.createElement('room-card') as LovelaceCard;
        htmlElement.setConfig = () => { htmlElement.hass = StubHomeAssistant };

        spy.mockReturnValueOnce(htmlElement);
        const result = createCardElement(cardConfig, StubHomeAssistant);

        expect(result?.outerHTML).toBe('<room-card style="box-shadow: none; border-radius: 0;"></room-card>');
    }),
    test('Passing LovelaceCardConfig with show_states and hass should return error', () => {
        const cardConfig = createMock<LovelaceCardConfig>();
        cardConfig.type = 'entities';

        let htmlElement = document.createElement('room-card') as LovelaceCard;
        htmlElement.setConfig = () => { throw new Error(); };

        let errorElement = document.createElement('hui-error-card') as LovelaceCard;
        errorElement.setConfig = () => { };

        spy.mockReturnValueOnce(htmlElement);
        spy.mockReturnValueOnce(errorElement);
        const result = createCardElement(cardConfig, StubHomeAssistant);

        expect(result?.outerHTML).toBe('<hui-error-card style="box-shadow: none; border-radius: 0;"></hui-error-card>');
    })
})

