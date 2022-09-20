import { isObject } from '../../src/util';

describe('Testing util file function getValue', () => {
    test('Passing string should return false', () => {
        expect(isObject('Test')).toBe(false);
    }),
    test('Passing array should return false', () => {
        expect(isObject([ "stateObj", this ])).toBe(false);
    }),
    test('Passing null should return false', () => {
        expect(isObject(null)).toBe(false);
    }),
    test('Passing object should return true', () => {
        expect(isObject({ stateObj: this })).toBe(true);
    })
})

