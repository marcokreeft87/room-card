import { HomeAssistant } from 'custom-card-helpers';
import { createMock } from 'ts-auto-mock';
import { LitElement } from 'lit';
import { renderEntitiesRow } from '../../src/entity';
import { HomeAssistantEntity, RoomCardEntity } from '../../src/types/room-card-types';
import { getRenderString } from '../utils';

describe('Testing util file function renderEntitiesRow', () => {
    const hass = createMock<HomeAssistant>();
    const stateObj = createMock<HomeAssistantEntity>();
    test('Passing empty entities should return entities-row withouth children', () => {   
        
        const entities: RoomCardEntity[] = [];
        const element: LitElement = createMock<LitElement>();

        const result = renderEntitiesRow(entities, hass, element);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<div class="entities-row"></div>');
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

        const result = renderEntitiesRow(entities, hass, element);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<div class="entities-row"><div class="entity" style="" @mousedown="start" @mouseup="end" @touchstart="start" @touchend="end" @touchcancel="end"> <span>Test Entity</span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="mdi:light" .stateColor="" style="" ></state-badge></div> </div></div>');
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

        const result = renderEntitiesRow(entities, hass, element, 'test-class');
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<div class="entities-row test-class"><div class="entity" style="" @mousedown="start" @mouseup="end" @touchstart="start" @touchend="end" @touchcancel="end"> <span>Test Entity</span> <div><state-badge class="icon-small " .stateObj="" .overrideIcon="mdi:light" .stateColor="" style="" ></state-badge></div> </div></div>');
    })
})