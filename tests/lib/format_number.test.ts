import { FrontendLocaleData, NumberFormat } from "custom-card-helpers";
import { createMock } from "ts-auto-mock";
import { formatNumber, isNumericState, numberFormatToLocale, round } from "../../src/lib/format_number";
import { FormattingOptions, HomeAssistantEntity } from "../../src/types/room-card-types";

describe('Testing format_number file', () => {
    test.each`
    number | precision| expected
    ${7200.12345}  ${2}   ${7200.12}
    ${7200.12345}  ${3}   ${7200.123}
    ${7200.12345}  ${undefined}   ${7200.12}
    `('Passing number and precision should return expected', ({ number, precision, expected }) => {  
        
        expect(round(number, precision)).toBe(expected);
    }),
    test.each`
    unit_of_measurement | state_class| expected
    ${'C'}  ${null}   ${true}
    ${null}  ${'test'}   ${true}
    ${null}  ${null}   ${false}
    `('Passing unit of measurement and state_class should return expected', ({ unit_of_measurement, state_class, expected }) => {  
        const entity = createMock<HomeAssistantEntity>();
        entity.attributes.unit_of_measurement = unit_of_measurement;
        entity.attributes.state_class = state_class;
        expect(isNumericState(entity)).toBe(expected);
    }),
    test.each`
    number_format | expected
    ${NumberFormat.comma_decimal}  ${['en-US', 'en']}
    ${NumberFormat.decimal_comma}  ${['de', 'es', 'it']}
    ${NumberFormat.space_comma}  ${['fr', 'sv', 'cs']}
    ${NumberFormat.system}  ${undefined}
    ${NumberFormat.none}  ${'nl'}
    `('Passing locale options should return expected', ({ number_format, expected }) => {  
        const options = createMock<FrontendLocaleData>();
        options.number_format = number_format;
        options.language = 'nl';
        expect(numberFormatToLocale(options)).toEqual(expected);
    }),

    test.each`
    num | expected | number_format | null_options | null_f_option | styleOptions
    ${7200}  ${'7.200'}  ${NumberFormat.decimal_comma}  ${false}  ${false}  ${undefined}
    ${7200.344}  ${'7.200,344'}  ${undefined}  ${false}  ${false}  ${undefined}
    ${'test'}  ${'test'}  ${undefined}  ${false}  ${false}  ${undefined}
    ${7200}  ${'7200'}  ${NumberFormat.none}  ${false}  ${false}  ${undefined}
    ${7200}  ${'7.200'}  ${NumberFormat.system}  ${true}  ${false}  ${undefined}
    ${7200}  ${'7.200'}  ${NumberFormat.system}  ${false}  ${true}  ${undefined}
    ${7200}  ${'7200 euro'}  ${NumberFormat.none}  ${false}  ${false}  ${{ currency: 'euro', style: 'currency' }}
    ${7200}  ${'7200 euro'}  ${NumberFormat.none}  ${false}  ${true}  ${undefined}
    `('Passing seconds should return expected duration', ({ num, expected, number_format, null_options, styleOptions }) => {  
        const localeOptions = createMock<FrontendLocaleData>();
        localeOptions.number_format = number_format;
        const options = createMock<FormattingOptions>();
        options.style = styleOptions !== undefined ? styleOptions.style : options.style;
        options.currency = styleOptions !== undefined ? styleOptions.currency : options.currency;
        options.maximumFractionDigits = 3;
        expect(formatNumber(num, null_options ? undefined: localeOptions, null_options ? undefined : options)).toBe(expected);
    })
});