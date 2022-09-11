import { isObject } from '../../src/util';

describe('Testing util file function getValue', () => {
    test('getValue: Passing string should return false', () => {
        expect(isObject('Test')).toBe(false);
    }),
    test('isObject: Passing array should return false', () => {
        expect(isObject([ "stateObj", this ])).toBe(false);
    }),
    test('isObject: Passing null should return false', () => {
        expect(isObject(null)).toBe(false);
    }),
    test('isObject: Passing object should return true', () => {
        expect(isObject({ stateObj: this })).toBe(true);
    })
})

