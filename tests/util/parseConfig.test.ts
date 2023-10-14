import { HomeAssistant } from 'custom-card-helpers';
import { parseConfig } from '../../src/util';
import { RoomCardConfig } from '../../src/types/room-card-types';

describe('Testing util file function parseConfig', () => {  
    const config = {
        entity: 'light.living_room',
        info_entities: [{ entity: 'sensor.temperature' }],
        entities: [{ entity: 'switch.bedroom' }],
        rows: [{ entities: [{ entity: 'light.kitchen' }] }],
      } as unknown as RoomCardConfig;
      const hass = {
        states: {
          'light.living_room': { state: 'on' },
          'sensor.temperature': { state: '20' },
          'switch.bedroom': { state: 'off' },
          'light.kitchen': { state: 'on' },
        },
      } as unknown as HomeAssistant;
    
      it('should return an object with empty arrays if config or hass is undefined', () => {
        const result = parseConfig(undefined, hass);
        expect(result).toEqual({ info_entities: [], entities: [] });
    
        const result2 = parseConfig(config, undefined);
        expect(result2).toEqual({ info_entities: [], entities: [] });
      });
    
      it('should return an object with the correct properties', () => {
        const result = parseConfig(config, hass);
    
        expect(result.stateObj).toEqual(hass.states['light.living_room']);
      });
    
      it('should set the hass property of the config object', () => {
        const result = parseConfig(config, hass);
    
        expect(config.hass).toEqual(hass);
      });
});