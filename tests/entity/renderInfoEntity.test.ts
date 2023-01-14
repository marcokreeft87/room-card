import { ActionHandlerEvent, HomeAssistant } from 'custom-card-helpers';
import { createMock } from 'ts-auto-mock';
import { LitElement } from 'lit';
import { renderInfoEntity } from '../../src/entity';
import { HomeAssistantEntity, RoomCardEntity } from '../../src/types/room-card-types';
import { getRenderString } from '../utils';
import { UNAVAILABLE } from '../../src/lib/constants';
import * as entityModule from '../../src/entity';

describe('Testing entity file function renderInfoEntity', () => {
    const hass = createMock<HomeAssistant>();
    const stateObj = createMock<HomeAssistantEntity>();
    const element: LitElement = createMock<LitElement>();
            
    stateObj.state = 'on';
    stateObj.attributes.friendly_name = 'Test Entity';    
   
    test('Passing entity with styles should return expected html', () => {   

        const entity: RoomCardEntity = createMock<RoomCardEntity>({
            stateObj: stateObj,
            show_state: false,
            show_name: false,
            styles: {
                color: 'red'
            },
            entity: 'sensor.test_entity'
        });
        
        const result = renderInfoEntity(entity, hass, element);
        const htmlResult = getRenderString(result);
        expect(htmlResult).toMatch('<div class="state entity " style="color: red;" @action=_handleAction .actionHandler=>on</div>');
    }),
    test('Passing entity show_state false and show_name false should return expected html', () => {   

        const entity: RoomCardEntity = createMock<RoomCardEntity>({
            stateObj: stateObj,
            show_state: false,
            show_name: false,
            entity: 'sensor.test_entity'
        });
        
        const result = renderInfoEntity(entity, hass, element);
        const htmlResult = getRenderString(result);

        console.log(htmlResult);
        
        expect(htmlResult).toMatch('<div class="state entity " style="" @action=_handleAction .actionHandler=>on</div>');
    }),
    test('Passing entity to be hidden should return null', () => {   
        
        stateObj.state = UNAVAILABLE;
        const entity: RoomCardEntity = createMock<RoomCardEntity>({
            stateObj: stateObj,
            hide_unavailable: true,
        });
        
        expect(renderInfoEntity(entity, hass, element)).toBeNull();
    }),
    test('Passing entity without stateObj should return null', () => {   
        
        const entity: RoomCardEntity = createMock<RoomCardEntity>({
            stateObj: undefined
        });

        const result = renderInfoEntity(entity, hass, element);
        expect(result).toBeNull();
    }),
    test('Passing entity without stateObj and icon should return expected html', () => {   
        
        stateObj.state = 'on';
        const entity: RoomCardEntity = createMock<RoomCardEntity>({
            stateObj: stateObj,
            show_icon: true,
            icon: 'mdi:desk'
        });

        const result = renderInfoEntity(entity, hass, element);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<div class="state entity icon-entity" style="" @action=_handleAction .actionHandler=><state-badge class="icon-small " .stateObj="" .overrideIcon="mdi:desk" .stateColor="" style="" ></state-badge></div>');
    }),
    test('Mouseclick should trigger action', () => {   
        
        const clickHandler = jest.spyOn(entityModule, 'clickHandler');

        stateObj.attributes['title'] = "Test title";
        const entity: RoomCardEntity = {
            stateObj: stateObj,
            show_icon: true,
            icon: 'mdi:table'
        };
        const result = renderInfoEntity(entity, hass, element);
        
        // eslint-disable-next-line @typescript-eslint/ban-types
        const endFn = result.values[2] as Function;

        const mouseEvent = createMock<ActionHandlerEvent>({
            detail: {
                action: 'test'
            }
        });

        endFn(mouseEvent);

        expect(clickHandler).toHaveBeenCalled();
    })
})