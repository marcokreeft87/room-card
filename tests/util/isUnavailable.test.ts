import { isUnavailable } from '../../src/util';
import { UNAVAILABLE_STATES } from '../../src/lib/constants';
import { StubHomeAssistantEntity } from '../testdata';

describe('Testing util file function isObject', () => {
    test('Passing HomeAssistantEntity with state unavailable should return true', () => {   
        StubHomeAssistantEntity.state = UNAVAILABLE_STATES[0];
        expect(isUnavailable(StubHomeAssistantEntity)).toBe(true);
    }),
    test('Passing HomeAssistantEntity with state unknown should return true', () => {        
        StubHomeAssistantEntity.state = UNAVAILABLE_STATES[1];
        expect(isUnavailable(StubHomeAssistantEntity)).toBe(true);
    }),
    test('Passing HomeAssistantEntity with state on should return false', () => {        
        StubHomeAssistantEntity.state = 'on';
        expect(isUnavailable(StubHomeAssistantEntity)).toBe(false);
    })
})  