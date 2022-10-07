import { NumberFormat, TimeFormat } from "custom-card-helpers";
import { formatDateTime } from "../../src/lib/format_date_time";

describe('Testing format_date_time file', () => {
    const locale = {
        language: 'NL', 
        number_format: NumberFormat.comma_decimal,
        time_format: TimeFormat.language
    }


    test.each`
    date | expected | time_format
    ${'2022-01-01T10:00'}  ${'1 januari 2022 10:00'}  ${TimeFormat.language} 
    ${'2022-01-01T10:00'}  ${'1 januari 2022 10:00 a.m.'}  ${TimeFormat.am_pm} 
    ${'2022-01-01T10:00'}  ${'1 januari 2022 10:00'}  ${TimeFormat.twenty_four} 
    ${'2022-01-01T10:00'}  ${'1 januari 2022 10:00'}  ${TimeFormat.system} 
    `('Passing date and locale should return formatted datetime', ({ date, expected, time_format }) => {  
        
        locale.time_format = time_format
        expect(formatDateTime(new Date(date), locale)).toBe(expected);
    })
});