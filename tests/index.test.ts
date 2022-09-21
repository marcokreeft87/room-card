import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { PropertyValues } from 'lit';
import { createMock } from 'ts-auto-mock';
import { HassEntity } from 'home-assistant-js-websocket';
import RoomCard from '../src/index';
import { RoomCardConfig, RoomCardRow } from '../src/types/room-card-types';
import { createEntity, getRenderString } from './utils';

describe('Testing index file class RoomCard', () => {
    const roomcard = new RoomCard();
    const hass = createMock<HomeAssistant>();
    // Create Main Entity
    createEntity('light.test_entity', hass, 'on', { icon: 'mdi:table' });

    let spy: jest.SpyInstance<HTMLElement, [tagName: string, options?: ElementCreationOptions | undefined]>;
    beforeEach(() => {
        spy = jest.spyOn(document, 'createElement');
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

        expect(htmlResult).toMatch('<ha-card elevation="2" style=""> <div class="card-header"> <div class="title"> </div> <div class="entities-info-row"> </div> </div> <div class="entities-row"><div class="entity" style="" @mousedown="start" @mouseup="end" @touchstart="start" @touchend="end" @touchcancel="end"> <span>test_entity2</span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div></div> </ha-card>');
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
        const props : PropertyValues = new Map([['config', config]]);        

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

        const props : PropertyValues = new Map([['_hass', oldHass]]);        

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

        expect(htmlResult).toMatch('<hui-warning></hui-warning>');
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
        
        expect(htmlResult).toMatch('<ha-card elevation="2" style=""> <div class="card-header"> <div class="title"><div class="main-state entity" style="" @click="" @dblclick=""> on </div> </div> <div class="entities-info-row"> </div> </div> <div class="entities-row"></div> </ha-card>');
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

        expect(htmlResult).toMatch('<ha-card elevation="2" style="color: red;"> <div class="card-header"> <div class="title"><div class="main-state entity" style="color: red;" @click="" @dblclick=""> on </div> </div> <div class="entities-info-row"> </div> </div> <div class="entities-row"></div> </ha-card>');
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

        expect(htmlResult).toMatch('<ha-card elevation="2" style=""> <div class="card-header"> <div class="title"><div class="main-state entity" style="" @click="" @dblclick=""> <state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge> </div> </div> <div class="entities-info-row"> </div> </div> <div class="entities-row"><div class="entity" style="" @mousedown="start" @mouseup="end" @touchstart="start" @touchend="end" @touchcancel="end"> <span>test_entity2</span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div></div> </ha-card>');
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

        expect(htmlResult).toMatch('<ha-card elevation="2" style=""> <div class="card-header"> <div class="title"><div class="main-state entity" style="" @click="" @dblclick=""> <state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge> </div> Test title</div> <div class="entities-info-row"> </div> </div> <div class="entities-row"><div class="entity" style="" @mousedown="start" @mouseup="end" @touchstart="start" @touchend="end" @touchcancel="end"> <span>test_entity2</span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div></div> </ha-card>');
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

        expect(htmlResult).toMatch('<ha-card elevation="2" style=""> <div class="card-header"> <div class="title"><div class="main-state entity" style="" @click="" @dblclick=""> <state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge> </div> Test title</div> <div class="entities-info-row"> <div class="state entity " style="" @click="">on</div> </div> </div> <div class="entities-row"></div> </ha-card>');
    }),
    test('Calling render with only rows and title should return expected html', () => {   

        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: "custom:room-card",
            show_icon: true,
            rows: [{
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

        expect(htmlResult).toMatch('<ha-card elevation="2" style=""> <div class="card-header"> <div class="title"><div class="main-state entity" style="" @click="" @dblclick=""> <state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge> </div> Test title</div> <div class="entities-info-row"> </div> </div> <div class="entities-row width-100"><div class="entity" style="" @mousedown="start" @mouseup="end" @touchstart="start" @touchend="end" @touchcancel="end"> <span>test_entity2</span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div></div><div class="entities-row width-100"><div class="entity" style="" @mousedown="start" @mouseup="end" @touchstart="start" @touchend="end" @touchcancel="end"> <span>test_entity3</span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div></div> </ha-card>');
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

        expect(htmlResult).toMatch('<ha-card elevation="2" style=""> <div class="card-header"> <div class="title"><div class="main-state entity" style="" @click="" @dblclick=""> <state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge> </div> Test title</div> <div class="entities-info-row"> </div> </div> </ha-card>');
    }),
    test('Calling render with only refcards and title should return expected html', () => {   
        
        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: "custom:room-card",
            show_icon: true,
            cards: [{ type: 'entities' } as LovelaceCardConfig,  
                    { type: 'custom:mini-graph' } as LovelaceCardConfig],
            title: 'Test title'
        }

        const entitiesElement = document.createElement('entities') as LovelaceCard;
        entitiesElement.setConfig = () => jest.fn();

        const graphElement = document.createElement('mini-graph') as LovelaceCard;
        graphElement.setConfig = () => jest.fn();

        spy.mockReturnValueOnce(entitiesElement);
        spy.mockReturnValueOnce(graphElement);

        roomcard.setConfig(config);
        roomcard.hass = hass;

        const result = roomcard.render();

        expect(result.values[4]).toHaveLength(2);
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

        expect(htmlResult).toMatch('<ha-card elevation="2" style=""> <div class="card-header"> <div class="title"><div class="main-state entity" style="" @click="" @dblclick=""> <state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge> </div> Test title</div> <div class="entities-info-row"> <div class="state entity " style="" @click="">on</div><div class="state entity " style="" @click="">on</div> </div> </div> <div class="entities-row"><div class="entity" style="" @mousedown="start" @mouseup="end" @touchstart="start" @touchend="end" @touchcancel="end"> <span>test_entity2</span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div><div class="entity" style="" @mousedown="start" @mouseup="end" @touchstart="start" @touchend="end" @touchcancel="end"> <span>test_entity3</span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div></div> </ha-card>');
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

        expect(htmlResult).toMatch('<ha-card elevation="2" style=""> <div class="card-header"> <div class="title"><div class="main-state entity" style="" @click="" @dblclick=""> <state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge> </div> Test title</div> <div class="entities-info-row"> <div class="state entity " style="" @click="">on</div><div class="state entity " style="" @click="">on</div> </div> </div> <div class="entities-row width-100"><div class="entity" style="" @mousedown="start" @mouseup="end" @touchstart="start" @touchend="end" @touchcancel="end"> <span>row_test_entity2</span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div></div><div class="entities-row width-100"><div class="entity" style="" @mousedown="start" @mouseup="end" @touchstart="start" @touchend="end" @touchcancel="end"> <span>row_test_entity3</span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge></div> </div></div> </ha-card>');
    })
})

