import { HomeAssistant } from 'custom-card-helpers';
import { createMock } from 'ts-auto-mock';
import { LitElement } from 'lit';
import { renderEntitiesRow } from '../../src/entity';
import { HomeAssistantEntity, RoomCardAlignment, RoomCardConfig, RoomCardEntity } from '../../src/types/room-card-types';
import { getRenderString } from '../utils';

describe('Testing entity file function renderEntitiesRow', () => {
    const hass = createMock<HomeAssistant>();
    const stateObj = createMock<HomeAssistantEntity>();
    const config = createMock<RoomCardConfig>();

    test('Passing empty entities should return entities-row withouth children', () => {   
        
        const entities: RoomCardEntity[] = [];
        const element: LitElement = createMock<LitElement>();

        const result = renderEntitiesRow(config, entities, hass, element);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<div class="entities-row content-left"></div>');
    }),
    test('Passing empty entities and content aligment center should return entities-row withouth children and alignment center', () => {   
        
        const innerConfig = createMock<RoomCardConfig>();
        const entities: RoomCardEntity[] = [];
        const element: LitElement = createMock<LitElement>();
        innerConfig.content_alignment = RoomCardAlignment.Center;

        const result = renderEntitiesRow(innerConfig, entities, hass, element);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<div class="entities-row content-center"></div>');
    }),
    test('Passing entities should return entities-row with one child element', () => {   
        
        stateObj.state = 'on';
        stateObj.attributes['icon'] = 'mdi:light';
        stateObj.entity_id = 'sensor.test_entity';
        stateObj.attributes.friendly_name = 'Test Entity';
        const entities: RoomCardEntity[] = [{
            stateObj: stateObj,
            entity: 'sensor.test_entity'
        }];
        const element: LitElement = createMock<LitElement>();

        const result = renderEntitiesRow(config, entities, hass, element);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<div class="entities-row content-left"><div class="entity" style="" @action=_handleAction .actionHandler=> <span>Test Entity</span> <div><state-badge class="icon-small " .hass= .stateObj="" .overrideIcon="mdi:light" .stateColor="" style="" ></state-badge></div> </div></div>');
    }),
    test('Passing entities and classes should return entities-row with one child element', () => {   
        
        stateObj.state = 'on';
        stateObj.attributes['icon'] = 'mdi:light';
        stateObj.entity_id = 'sensor.test_entity';
        stateObj.attributes.friendly_name = 'Test Entity';
        const entities: RoomCardEntity[] = [{
            stateObj: stateObj,
            entity: 'sensor.test_entity'
        }];
        const element: LitElement = createMock<LitElement>();

        const result = renderEntitiesRow(config, entities, hass, element, 'test-class');
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<div class="entities-row content-left test-class"><div class="entity" style="" @action=_handleAction .actionHandler=> <span>Test Entity</span> <div><state-badge class="icon-small " .hass= .stateObj="" .overrideIcon="mdi:light" .stateColor="" style="" ></state-badge></div> </div></div>');
    })
})