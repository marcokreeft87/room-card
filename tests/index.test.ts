import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import * as customHelpers from 'custom-card-helpers';
import { PropertyValues } from 'lit';
import { createMock } from 'ts-auto-mock';
import { HassEntity } from 'home-assistant-js-websocket';
import RoomCard from '../src/index';
import { RoomCardAlignment, RoomCardConfig, RoomCardLovelaceCardConfig, RoomCardRow } from '../src/types/room-card-types';
import { createEntity, getRenderString } from './utils';
import { HassEntities } from 'home-assistant-js-websocket/dist';

describe('Testing index file class RoomCard', () => {
    const roomcard = new RoomCard();
    roomcard.monitoredStates = createMock<HassEntities>();
    roomcard._helpers = { createCardElement: jest.fn() }

    const hass = createMock<HomeAssistant>();
    // Create Main Entity
    createEntity('light.test_entity', hass, 'on', { icon: 'mdi:table' });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let spy: jest.SpyInstance<HTMLElement, [cardConfig: any, isRow?: boolean]>;
    beforeEach(() => {
        spy = jest.spyOn(customHelpers, 'createThing');
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
    });
    test('Calling render without hass and config should return empty html', () => {

        const result = roomcard.render();
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('');
    }),
        test('Calling render without entity and only entities should return expected html', () => {

            const config: RoomCardConfig = {
                entityIds: [],
                type: "custom:room-card",
                show_icon: true,
                entities: [createEntity('light.test_entity2', hass, 'on', { icon: 'mdi:table' })],
                entity: undefined,
                styles: undefined
            }

            roomcard.setConfig(config);
            roomcard.hass = hass;

            const result = roomcard.render();
            const htmlResult = getRenderString(result);

            expect(htmlResult).toMatch('<ha-card elevation="2" style=""> <div class="card-header"> <div class="title" @action=_handleAction .actionHandler=> </div> <div class="entities-info-row"> </div> </div> <div class="entities-row content-left"><div class="entity" style="" @action=_handleAction .actionHandler=> <span>test_entity2</span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div></div> </ha-card>');
        }),
        test('Calling setconfig should set config', () => {

            const config: RoomCardConfig = {
                entity: 'light.test_entity',
                entityIds: ['light.test_entity'],
                type: "custom:room-card"
            }

            roomcard.setConfig(config);

            expect(roomcard.config).toMatchObject(config);
        }),
        test('Calling setconfig should set config', () => {

            const config: RoomCardConfig = {
                entity: 'light.test_entity',
                entityIds: ['light.test_entity'],
                type: "custom:room-card"
            }

            roomcard.setConfig(config);

            expect(roomcard.config).toMatchObject(config);
        }),
        test('Calling shouldUpdate with config should return true', () => {

            const config: RoomCardConfig = {
                entity: 'light.test_entity',
                entityIds: ['light.test_entity'],
                type: 'custom:room-card'
            }
            const props: PropertyValues = new Map([['config', config]]);

            const result = roomcard['shouldUpdate'](props);

            expect(result).toBeTruthy();
        }),
        test('Calling shouldUpdate with config should return true', () => {
            const hassEntity = createMock<HassEntity>();
            hassEntity.entity_id = 'light.test_entity';
            hassEntity.state = 'off';

            const oldHass = createMock<HomeAssistant>();
            oldHass.states['light.test_entity'] = hassEntity;

            const config: RoomCardConfig = {
                entity: 'light.test_entity',
                entityIds: ['light.test_entity'],
                type: 'custom:room-card'
            }

            roomcard.setConfig(config);
            roomcard.hass = hass;

            const props: PropertyValues = new Map([['_hass', oldHass]]);

            const result = roomcard['shouldUpdate'](props);

            expect(result).toBeTruthy();
        }),
        test('Calling render should throw error', () => {

            const config: RoomCardConfig = {
                entity: 'light.test_entity',
                entityIds: ['light.test_entity'],
                type: "custom:room-card",
                title: 'Test title',
                icon: 'mdi:test-icon'
            }

            roomcard.setConfig(config);
            roomcard.hass = hass;

            const result = roomcard.render();
            const htmlResult = getRenderString(result);

            expect(htmlResult).toMatch('<hui-warning>Error: Entity: light.test_entity => Icon defined but show_icon is set to false or not defined. Please set show_icon to true</hui-warning>');
        }),
        test('Calling render without entities, info_entities and rows should return expected html', () => {

            const config: RoomCardConfig = {
                entity: 'light.test_entity',
                entityIds: ['light.test_entity'],
                type: 'custom:room-card'
            }

            roomcard.setConfig(config);
            roomcard.hass = hass;

            const result = roomcard.render();
            const htmlResult = getRenderString(result);

            expect(htmlResult).toMatch('<ha-card elevation="2" style=""> <div class="card-header"> <div class="title" @action=_handleAction .actionHandler=><div class="main-state entity" style=""> on </div> </div> <div class="entities-info-row"> </div> </div> <div class="entities-row content-left"></div> </ha-card>');
        }),
        test('Calling render without entities, info_entities and rows but with card_styles should return expected html', () => {

            const config: RoomCardConfig = {
                entity: 'light.test_entity',
                entityIds: ['light.test_entity'],
                type: 'custom:room-card',
                card_styles: {
                    color: 'red'
                }
            }

            roomcard.setConfig(config);
            roomcard.hass = hass;

            const result = roomcard.render();
            const htmlResult = getRenderString(result);

            expect(htmlResult).toMatch('<ha-card elevation="2" style="color: red;"> <div class="card-header"> <div class="title" @action=_handleAction .actionHandler=><div class="main-state entity" style=""> on </div> </div> <div class="entities-info-row"> </div> </div> <div class="entities-row content-left"></div> </ha-card>');
        }),
        test('Calling render without entities, info_entities and rows but with styles should return expected html', () => {

            const config: RoomCardConfig = {
                entity: 'light.test_entity',
                entityIds: ['light.test_entity'],
                type: 'custom:room-card',
                styles: {
                    color: 'red'
                }
            }

            roomcard.setConfig(config);
            roomcard.hass = hass;

            const result = roomcard.render();
            const htmlResult = getRenderString(result);

            expect(htmlResult).toMatch('<ha-card elevation="2" style=""> <div class="card-header"> <div class="title" @action=_handleAction .actionHandler=><div class="main-state entity" style="color: red;"> on </div> </div> <div class="entities-info-row"> </div> </div> <div class="entities-row content-left"></div> </ha-card>');
        }),
        test('Calling render without only entities should return expected html', () => {

            const config: RoomCardConfig = {
                entity: 'light.test_entity',
                entityIds: ['light.test_entity'],
                type: "custom:room-card",
                show_icon: true,
                entities: [createEntity('light.test_entity2', hass, 'on', { icon: 'mdi:table' })]
            }

            roomcard.setConfig(config);
            roomcard.hass = hass;

            const result = roomcard.render();
            const htmlResult = getRenderString(result);

            expect(htmlResult).toMatch('<ha-card elevation="2" style=""> <div class="card-header"> <div class="title" @action=_handleAction .actionHandler=><div class="main-state entity" style=""> <state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge> </div> </div> <div class="entities-info-row"> </div> </div> <div class="entities-row content-left"><div class="entity" style="" @action=_handleAction .actionHandler=> <span>test_entity2</span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div></div> </ha-card>');
        }),
        test('Calling render with only entities and title should return expected html', () => {

            const config: RoomCardConfig = {
                entity: 'light.test_entity',
                entityIds: ['light.test_entity'],
                type: "custom:room-card",
                show_icon: true,
                entities: [createEntity('light.test_entity2', hass, 'on', { icon: 'mdi:table' })],
                title: 'Test title'
            }

            roomcard.setConfig(config);
            roomcard.hass = hass;

            const result = roomcard.render();
            const htmlResult = getRenderString(result);

            expect(htmlResult).toMatch('<ha-card elevation="2" style=""> <div class="card-header"> <div class="title" @action=_handleAction .actionHandler=><div class="main-state entity" style=""> <state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge> </div> Test title</div> <div class="entities-info-row"> </div> </div> <div class="entities-row content-left"><div class="entity" style="" @action=_handleAction .actionHandler=> <span>test_entity2</span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div></div> </ha-card>');
        }),
        test('Calling render with only info_entities and title should return expected html', () => {

            const config: RoomCardConfig = {
                entity: 'light.test_entity',
                entityIds: ['light.test_entity'],
                type: "custom:room-card",
                show_icon: true,
                info_entities: [createEntity('light.test_entity2', hass, 'on', { icon: 'mdi:table' })],
                title: 'Test title'
            }

            roomcard.setConfig(config);
            roomcard.hass = hass;

            const result = roomcard.render();
            const htmlResult = getRenderString(result);

            expect(htmlResult).toMatch('<ha-card elevation="2" style=""> <div class="card-header"> <div class="title" @action=_handleAction .actionHandler=><div class="main-state entity" style=""> <state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge> </div> Test title</div> <div class="entities-info-row"> <div class="state entity " style="" @action=_handleAction .actionHandler=>on</div> </div> </div> <div class="entities-row content-left"></div> </ha-card>');
        }),
        test('Calling render with only rows and title should return expected html', () => {

            const config: RoomCardConfig = {
                entity: 'light.test_entity',
                entityIds: ['light.test_entity'],
                type: "custom:room-card",
                show_icon: true,
                rows: [{
                    content_alignment: RoomCardAlignment.Center,
                    entities: [createEntity('light.test_entity2', hass, 'on', { icon: 'mdi:table' })]
                } as RoomCardRow,
                {
                    entities: [createEntity('light.test_entity3', hass, 'on', { icon: 'mdi:chair' })]
                } as RoomCardRow],
                title: 'Test title'
            }

            roomcard.setConfig(config);
            roomcard.hass = hass;

            const result = roomcard.render();
            const htmlResult = getRenderString(result);

            expect(htmlResult).toMatch('<ha-card elevation="2" style=""> <div class="card-header"> <div class="title" @action=_handleAction .actionHandler=><div class="main-state entity" style=""> <state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge> </div> Test title</div> <div class="entities-info-row"> </div> </div> <div class="entities-row content-center"><div class="entity" style="" @action=_handleAction .actionHandler=> <span>test_entity2</span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div></div><div class="entities-row content-left"><div class="entity" style="" @action=_handleAction .actionHandler=> <span>test_entity3</span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div></div> </ha-card>');
        }),
        test('Calling render with only rows without entities and title should return expected html', () => {

            const config: RoomCardConfig = {
                entity: 'light.test_entity',
                entityIds: ['light.test_entity'],
                type: "custom:room-card",
                show_icon: true,
                rows: [{
                }],
                title: 'Test title'
            }

            roomcard.setConfig(config);
            roomcard.hass = hass;

            const result = roomcard.render();
            const htmlResult = getRenderString(result);

            expect(htmlResult).toMatch('<ha-card elevation="2" style=""> <div class="card-header"> <div class="title" @action=_handleAction .actionHandler=><div class="main-state entity" style=""> <state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge> </div> Test title</div> <div class="entities-info-row"> </div> </div> </ha-card>');
        }),
        test('Calling render with entities, info_entities and title should return expected html', () => {

            const config: RoomCardConfig = {
                entity: 'light.test_entity',
                entityIds: ['light.test_entity'],
                type: "custom:room-card",
                show_icon: true,
                entities: [createEntity('light.test_entity2', hass, 'on', { icon: 'mdi:table' }),
                createEntity('light.test_entity3', hass, 'on', { icon: 'mdi:fox' })],
                info_entities: [createEntity('light.info_test_entity', hass, 'on', { icon: 'mdi:chicken' }),
                createEntity('light.info_test_entity2', hass, 'on', { icon: 'mdi:headphones' })],
                title: 'Test title'
            }

            roomcard.setConfig(config);
            roomcard.hass = hass;

            const result = roomcard.render();
            const htmlResult = getRenderString(result);

            expect(htmlResult).toMatch('<ha-card elevation="2" style=""> <div class="card-header"> <div class="title" @action=_handleAction .actionHandler=><div class="main-state entity" style=""> <state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge> </div> Test title</div> <div class="entities-info-row"> <div class="state entity " style="" @action=_handleAction .actionHandler=>on</div><div class="state entity " style="" @action=_handleAction .actionHandler=>on</div> </div> </div> <div class="entities-row content-left"><div class="entity" style="" @action=_handleAction .actionHandler=> <span>test_entity2</span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div><div class="entity" style="" @action=_handleAction .actionHandler=> <span>test_entity3</span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div></div> </ha-card>');
        }),
        test('Calling render with entities, info_entities and rows title, rows should override and should return expected html', () => {

            const config: RoomCardConfig = {
                entity: 'light.test_entity',
                entityIds: ['light.test_entity'],
                type: "custom:room-card",
                show_icon: true,
                entities: [createEntity('light.test_entity2', hass, 'on', { icon: 'mdi:table' }),
                createEntity('light.test_entity3', hass, 'on', { icon: 'mdi:fox' })],
                info_entities: [createEntity('light.info_test_entity', hass, 'on', { icon: 'mdi:chicken' }),
                createEntity('light.info_test_entity2', hass, 'on', { icon: 'mdi:headphones' })],
                rows: [{
                    entities: [createEntity('light.row_test_entity2', hass, 'on', { icon: 'mdi:notepad' })]
                } as RoomCardRow,
                {
                    entities: [createEntity('light.row_test_entity3', hass, 'on', { icon: 'mdi:light' })]
                } as RoomCardRow],
                title: 'Test title'
            }

            roomcard.setConfig(config);
            roomcard.hass = hass;

            const result = roomcard.render();
            const htmlResult = getRenderString(result);

            expect(htmlResult).toMatch('<ha-card elevation="2" style=""> <div class="card-header"> <div class="title" @action=_handleAction .actionHandler=><div class="main-state entity" style=""> <state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge> </div> Test title</div> <div class="entities-info-row"> <div class="state entity " style="" @action=_handleAction .actionHandler=>on</div><div class="state entity " style="" @action=_handleAction .actionHandler=>on</div> </div> </div> <div class="entities-row content-left"><div class="entity" style="" @action=_handleAction .actionHandler=> <span>row_test_entity2</span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div></div><div class="entities-row content-left"><div class="entity" style="" @action=_handleAction .actionHandler=> <span>row_test_entity3</span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div></div> </ha-card>');
        }),
        test('Calling getCardSize should return 2', () => {

            const config: RoomCardConfig = {
                entity: 'light.test_entity',
                entityIds: ['light.test_entity'],
                type: "custom:room-card",
                show_icon: true,
                entities: [],
                info_entities: [],
                rows: [],
                title: 'Test title'
            }

            roomcard.setConfig(config);
            roomcard.hass = hass;

            expect(roomcard.getCardSize()).toBe(2);
        }), test('Calling getCardSize should return 2', () => {

            const config: RoomCardConfig = {
                entity: 'light.test_entity',
                entityIds: ['light.test_entity'],
                type: "custom:room-card",
                show_icon: true,
                entities: [],
                info_entities: [],
                rows: undefined,
                cards: undefined,
                title: 'Test title'
            }

            roomcard.setConfig(config);
            roomcard.hass = hass;

            expect(roomcard.getCardSize()).toBe(2);
        }),
        test('Calling getCardSize should return 5', () => {

            const config: RoomCardConfig = {
                entity: 'light.test_entity',
                entityIds: ['light.test_entity'],
                type: "custom:room-card",
                show_icon: true,
                entities: [createEntity('light.test_entity2', hass, 'on', { icon: 'mdi:table' }),
                createEntity('light.test_entity3', hass, 'on', { icon: 'mdi:fox' })],
                info_entities: [createEntity('light.info_test_entity', hass, 'on', { icon: 'mdi:chicken' }),
                createEntity('light.info_test_entity2', hass, 'on', { icon: 'mdi:headphones' })],
                rows: [{
                    entities: [createEntity('light.row_test_entity2', hass, 'on', { icon: 'mdi:notepad' })]
                } as RoomCardRow,
                {
                    entities: [createEntity('light.row_test_entity3', hass, 'on', { icon: 'mdi:light' })]
                } as RoomCardRow],
                title: 'Test title'
            }

            roomcard.setConfig(config);
            roomcard.hass = hass;

            expect(roomcard.getCardSize()).toBe(5);
        }),
        test('Calling getCardSize should return 3', () => {

            const config: RoomCardConfig = {
                entity: 'light.test_entity',
                entityIds: ['light.test_entity'],
                type: "custom:room-card",
                show_icon: true,
                cards: [{ type: 'entities' } as LovelaceCardConfig,
                { type: 'custom:mini-graph' } as LovelaceCardConfig],
                title: 'Test title',
                hide_title: true,
                info_entities: undefined
            }

            roomcard.setConfig(config);

            expect(roomcard.getCardSize()).toBe(3);
        }),
        test('Calling createCardElement with config.show_states true', () => {
            const config: RoomCardLovelaceCardConfig = {
                entity: 'light.test_entity',
                show_states: 'test',
                type: 'custom'
            }

            const result = roomcard.createCardElement(config, hass);

            expect(result).toBeDefined();
        }),
        test('Calling createCardElement with config.show_states true', () => {
            hass.states['light.test_entity'].state = 'test';
            const config: RoomCardLovelaceCardConfig = {
                entity: 'light.test_entity',
                show_states: ['test'],
                type: 'custom'
            }
            // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
            roomcard._helpers = { createCardElement(_config: LovelaceCardConfig): LovelaceCard {
                    const element = {
                        style: {}
                    } as LovelaceCard;

                    return element;
                }
            }

            const result = roomcard.createCardElement(config, hass);

            expect(result).toHaveProperty('hass');
        }),
        test('Calling set hass should set monitoredStates', () => {
            const roomCard = new RoomCard();
            roomCard.config = { entityIds: ['light.living_room', 'switch.bedroom'] } as RoomCardConfig;
            roomCard.monitoredStates = {
                'light.living_room': { last_updated: '2022-01-01T00:00:00.000Z', last_changed: '2022-01-01T00:00:00.000Z' },
                'switch.bedroom': { last_updated: '2022-01-01T00:00:00.000Z', last_changed: '2022-01-01T00:00:00.000Z' },
            } as unknown as HassEntities;
            const hass = {
                states: {
                    'light.living_room': { last_updated: '2022-01-02T00:00:00.000Z', last_changed: '2022-01-02T00:00:00.000Z' },
                    'switch.bedroom': { last_updated: '2022-01-02T00:00:00.000Z', last_changed: '2022-01-02T00:00:00.000Z' },
                    'switch.kitchen': { last_updated: '2022-01-02T00:00:00.000Z', last_changed: '2022-01-02T00:00:00.000Z' },
                },
            } as unknown as HomeAssistant;

            roomCard.updateMonitoredStates(hass);

            expect(roomCard.monitoredStates).toEqual({
                'light.living_room': { last_updated: '2022-01-02T00:00:00.000Z', last_changed: '2022-01-02T00:00:00.000Z' },
                'switch.bedroom': { last_updated: '2022-01-02T00:00:00.000Z', last_changed: '2022-01-02T00:00:00.000Z' },
            });
        }),
        test('Calling set hass should set monitoredStates', () => {
            const roomCard = new RoomCard();
            roomCard.config = { entityIds: ['light.living_room', 'switch.bedroom'] } as RoomCardConfig;
            roomCard.monitoredStates = {
                'switch.bedroom': { last_updated: '2022-01-01T00:00:00.000Z', last_changed: '2022-01-01T00:00:00.000Z' },
            } as unknown as HassEntities;
            const hass = {
                states: {
                    'switch.bedroom': { last_updated: '2022-01-02T00:00:00.000Z', last_changed: '2022-01-02T00:00:00.000Z' },
                    'light.living_room': { last_updated: '2022-01-02T00:00:00.000Z', last_changed: '2022-01-02T00:00:00.000Z' },
                },
            } as unknown as HomeAssistant;

            roomCard.updateMonitoredStates(hass);

            expect(roomCard.monitoredStates).toEqual({
                'switch.bedroom': { last_updated: '2022-01-02T00:00:00.000Z', last_changed: '2022-01-02T00:00:00.000Z' },
            });
        }),
        test('Calling set hass should set monitoredStates', () => {
            const roomCard = new RoomCard();
            roomCard.config = { entityIds: ['light.living_room', 'switch.bedroom', 'switch.kitchen'] } as RoomCardConfig;
            roomCard.monitoredStates = {
                'light.living_room': { last_updated: '2022-01-01T00:00:00.000Z', last_changed: '2022-01-01T00:00:00.000Z' },
                'switch.bedroom': { last_updated: '2022-01-01T00:00:00.000Z', last_changed: '2022-01-01T00:00:00.000Z' },
                'switch.kitchen': { last_updated: '2022-01-01T00:00:00.000Z', last_changed: '2022-01-01T00:00:00.000Z' },
            } as unknown as HassEntities;
            const hass = {
                states: {
                    'light.living_room': { last_updated: '2022-01-02T00:00:00.000Z', last_changed: '2022-01-02T00:00:00.000Z' },
                    'switch.bedroom': { last_updated: '2022-01-02T00:00:00.000Z', last_changed: '2022-01-02T00:00:00.000Z' },
                },
            } as unknown as HomeAssistant;

            roomCard.updateMonitoredStates(hass);

            expect(roomCard.monitoredStates).toEqual({
                'light.living_room': { last_updated: '2022-01-02T00:00:00.000Z', last_changed: '2022-01-02T00:00:00.000Z' },
                'switch.bedroom': { last_updated: '2022-01-02T00:00:00.000Z', last_changed: '2022-01-02T00:00:00.000Z' }
            });
        }),
        test('should create a card element using the createThing function if _helpers does not exist', () => {
            const roomCard = new RoomCard();
            const config = { entity: 'light.living_room', show_states: ['on'], type: 'custom' } as RoomCardLovelaceCardConfig;
            const hass = {
                states: {
                    'light.living_room': { state: 'on' },
                },
            } as unknown as HomeAssistant;

            const entitiesElement = document.createElement('entities') as LovelaceCard;

            spy.mockReturnValueOnce(entitiesElement);
            const element = roomCard.createCardElement(config, hass);

            expect(element).toBeDefined();
            expect(spy).toHaveBeenCalledWith(config);
        }),
        test('Passing config with cards', () => {        
            const entitiesElement = document.createElement('entities') as LovelaceCard;
            roomcard._helpers.createCardElement = jest.fn().mockReturnValue(entitiesElement);
            
            const config: RoomCardConfig = {
                entity: 'light.test_entity',
                entityIds: ['light.test_entity'],
                type: "custom:room-card",
                show_icon: true,
                title: 'Test title',
                cards: [{ type: 'entities', entity: 'light.test_entity' } as LovelaceCardConfig]
            }

            roomcard.setConfig(config);
            roomcard.hass = hass;

            const result = roomcard.render();
            const htmlResult = getRenderString(result);

            expect(htmlResult).toMatch('<ha-card elevation="2" style=""> <div class="card-header"> <div class="title" @action=_handleAction .actionHandler=><div class="main-state entity" style=""> <state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge> </div> Test title</div> <div class="entities-info-row"> </div> </div> <div class="entities-row content-left"></div> </ha-card>');
        })
})