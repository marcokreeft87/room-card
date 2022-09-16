import { HomeAssistant } from 'custom-card-helpers';
import { createMock } from 'ts-auto-mock';
import { HTMLTemplateResult, LitElement } from 'lit';
import { renderEntitiesRow } from '../../src/entity';
import { HomeAssistantEntity, RoomCardEntity } from '../../src/types/room-card-types';

describe('Testing util file function renderEntitiesRow', () => {
    const hass = createMock<HomeAssistant>();
    const stateObj = createMock<HomeAssistantEntity>();
    test('Passing entity_id should return entity name', () => {   
        
        const entities: RoomCardEntity[] = [{
            stateObj: stateObj
        }];
        const element: LitElement = createMock<LitElement>();

        const result = renderEntitiesRow(entities, hass, element) as HTMLTemplateResult;
        console.log(result.strings.join(''));
        expect(result.strings).toContain('<div class="entities-row ')
        //console.log(result.);
        //expect(renderEntitiesRow(entities, hass, element)).toBe('test_entity');
    })
})

