import { secondsToDuration } from "../../src/lib/seconds_to_duration";

describe('Testing seconds_to_duration file', () => {
    test.each`
    seconds | expected
    ${7200}  ${'2:00:00'}
    ${7260}  ${'2:01:00'}
    ${7265}  ${'2:01:05'}
    ${1}  ${'1'}
    ${0.5}  ${null}
    `('Passing seconds should return expected duration', ({ seconds, expected }) => {  
        
        expect(secondsToDuration(seconds)).toBe(expected);
    })
});