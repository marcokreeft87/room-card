import { createMock } from 'ts-auto-mock';
import { HomeAssistant } from 'custom-card-helpers';
import { entityStateDisplay } from '../../src/entity';
import { HomeAssistantEntity, RoomCardEntity } from '../../src/types/room-card-types';
import { UNAVAILABLE } from '../../src/lib/constants';


describe('Testing util file function computeEntity', () => {
    const stateObj = createMock<HomeAssistantEntity>();
    const hass = createMock<HomeAssistant>();
    hass.localize = jest.fn();

    test('Passing hass and unavailable entity should return undefined', () => {  
        stateObj.state = UNAVAILABLE;
        const entity: RoomCardEntity = {
            stateObj: stateObj
        };
        
        expect(entityStateDisplay(hass, entity)).toBe(undefined);
        expect(hass.localize).toBeCalled();
    }),
    test('Passing hass and state on entity should return stateObj.state', () => {  
        stateObj.state = 'on';
        const entity: RoomCardEntity = {
            stateObj: stateObj
        };
        
        expect(entityStateDisplay(hass, entity)).toBe(stateObj.state);
    })
})

