import { HomeAssistant } from 'custom-card-helpers';
import { createMock } from 'ts-auto-mock';
import { HomeAssistantEntity } from '../../src/types/room-card-types';
import { evalTemplate } from '../../src/util';

describe('Testing util file function evalTemplate', () => {
    const hass = createMock<HomeAssistant>();
    const stateObj = createMock<HomeAssistantEntity>();

    test.each`
    state | expected
    ${'18'}  ${'color:red'}   
    ${'80'}  ${'color:green'}
    ${'60'}  ${'color:orange'}
    `('Passing HomeAssistant, HassEntity and Func should return false', ({ state, expected }) => {

        stateObj.state = state;
        const funcString = "if (entity.state >= 70) return 'color:green';  else if (entity.state >= 20) return 'color:orange';  else return 'color:red';";

        expect(evalTemplate(hass, stateObj, funcString)).toBe(expected);
    }),
    test('Passing HomeAssistant null, HassEntity and Func should return false', () => {

        stateObj.state = '18';
        const funcString = "if (entity.state >= 70) return 'color:green';  else if (entity.state >= 20) return 'color:orange';  else return 'color:red';";

        expect(evalTemplate(undefined, stateObj, funcString)).toBe('color:red');
    }),
    test('Passing HomeAssistant, HassEntity and Func should throw error', () => {

        stateObj.state = '18';
        const funcString = "throw new Error();";

        expect(() => evalTemplate(undefined, stateObj, funcString)).toThrowError("Error:  in 'throw new Error();'");
    }),
    test('Passing HomeAssistant, HassEntity and long Func should throw error', () => {

        stateObj.state = '18';
        const funcString = "const t = 'Sww7Ih6qNw9OY0boSmFYvoKEXoTXu3iN66Dn0z5vjkJ0rk0jYctLzBN3hmz44pB65raNquYGdZyhLSglctob7WWxNr0kpzEILaRD'; throw new Error();";

        expect(() => evalTemplate(undefined, stateObj, funcString)).toThrowError("Error:  in 'const t = 'Sww7Ih6qNw9OY0boSmFYvoKEXoTXu3iN66Dn0z5vjkJ0rk0jYctLzBN3hmz44pB65raNquYGdZyhLSglctob7WW...'");
    })
})

