import { HomeAssistant, NumberFormat, TimeFormat } from 'custom-card-helpers';
import { createMock } from 'ts-auto-mock';
import { computeStateDomain, computeStateDisplay } from '../../src/lib/compute_state_display';
import { UNAVAILABLE, UNKNOWN } from '../../src/lib/constants';
import { HomeAssistantEntity } from '../../src/types/room-card-types';

describe('Testing compute_state_display file', () => {

    const hass = createMock<HomeAssistant>();
    hass.localize = jest.fn();
    hass.locale = {
        language: 'NL', 
        number_format: NumberFormat.comma_decimal,
        time_format: TimeFormat.language
    }
    const stateObj = createMock<HomeAssistantEntity>();
    stateObj.state = 'on';

    test.each`
    entity_id | expected
    ${'sensor.test_entity'}  ${'sensor'}   
    ${'binary_sensor.test_entity'}  ${'binary_sensor'}   
    ${'switch.test_entity'}  ${'switch'}   
    `('Passing entity_id should return domain', ({ entity_id, expected }) => {  
        const testStateObj = createMock<HomeAssistantEntity>();
        testStateObj.entity_id = entity_id;  
        expect(computeStateDomain(testStateObj)).toBe(expected);
    }),
    test('Passing LocalizeFunc, HomeAssistantEntity, FrontendLocaleData should call localize function', () => {        

        computeStateDisplay(hass.localize, stateObj, hass.locale, UNKNOWN);
        expect(hass.localize).toBeCalled();

        computeStateDisplay(hass.localize, stateObj, hass.locale, UNAVAILABLE);
        expect(hass.localize).toBeCalled();

        computeStateDisplay(hass.localize, stateObj, hass.locale);
        expect(hass.localize).toBeCalled();
    })
    test.each`
    objstate | unit_of_measurement | device_class | expected | entity_id | state
    ${'100'}  ${'m'}   ${'sensor'}    ${'100 m'}    ${'sensor.distance'}    ${'100'}
    ${'100'}  ${undefined}   ${'sensor'}    ${'100'}    ${'sensor.distance'}    ${'100'}
    ${'100.233'}  ${'$'}   ${'monetary'}    ${'100.23 $'}    ${'sensor.money'}  ${'100.233'}
    ${'2022-01-01 10:00'}  ${''}   ${''}    ${'1 januari 2022 10:00'}    ${'input_datetime.money'}  ${'2022-01-01 10:00'}
    ${'2022-01-01'}  ${''}   ${''}    ${'1 januari 2022'}    ${'input_datetime.money'}  ${'2022-01-01'}
    ${'10:00'}  ${''}   ${''}    ${'10:00'}    ${'input_datetime.money'}    ${'10:00'}
    ${'test'}  ${''}   ${''}    ${'test'}    ${'input_datetime.money'}  ${'test'}
    ${'10:test'}  ${''}   ${''}    ${'10:test'}    ${'input_datetime.money'}    ${'10:test'}
    ${'2022-01-01 10:00'}  ${''}   ${''}    ${'1 januari 2022 10:00'}    ${'input_datetime.money'}  ${undefined}
    ${'2022-01-01'}  ${''}   ${''}    ${'1 januari 2022'}    ${'input_datetime.money'}  ${undefined}
    ${'10:00'}  ${''}   ${''}    ${'10:00'}    ${'input_datetime.money'}  ${undefined}
    ${'test'}  ${''}   ${''}    ${'test'}    ${'input_datetime.money'}  ${undefined}
    ${'on'}  ${''}   ${''}    ${'24 %'}    ${'humidifier.money'}  ${undefined}
    ${'25'}  ${''}   ${''}    ${'25'}    ${'counter.money'}  ${undefined}
    ${'25'}  ${''}   ${''}    ${'25'}    ${'number.money'}  ${undefined}
    ${'25'}  ${''}   ${''}    ${'25'}    ${'input_number.money'}  ${undefined}
    ${'2022-01-01 10:00'}  ${''}   ${''}    ${'1 januari 2022 10:00'}    ${'button.money'}  ${undefined}
    ${'2022-01-01 10:00'}  ${''}   ${'timestamp'}    ${'1 januari 2022 10:00'}    ${'sensor.money'}  ${undefined}
    ${'testvalue'}  ${''}   ${'switch'}    ${'testvalue'}    ${'sensor.money'}  ${'testvalue'}
    `('Passing LocalizeFunc, HomeAssistantEntity, FrontendLocaleData with numeric stateObj should call localize function', 
    ({ objstate, unit_of_measurement, device_class, expected, entity_id, state}) => {        

        stateObj.entity_id = entity_id;
        stateObj.state = objstate;
        stateObj.attributes.unit_of_measurement = unit_of_measurement;
        stateObj.attributes.device_class = device_class;
        stateObj.attributes.state_class = unit_of_measurement === undefined && device_class === 'sensor' ? 'test' : '';

        if(state === undefined) {
            if(entity_id === 'input_datetime.money') {

                const components = objstate.split(' ');
                const hasDate = objstate.indexOf('-') > 0;
                const hasTime = objstate.indexOf(':') > 0;
    
                stateObj.attributes.has_date = hasDate;
                stateObj.attributes.has_time = hasTime;
                
                if(hasDate) {                
                    const dateComponent = components.filter((x: string) => { return x.indexOf('-') > 0; })[0].split('-');
    
                    stateObj.attributes.year = dateComponent[0];
                    stateObj.attributes.month = parseInt(dateComponent[1]);
                    stateObj.attributes.day = dateComponent[2];
                }
                if(hasTime) {                
                    const timeComponent = components.filter((x: string) => { return x.indexOf(':') > 0; })[0].split(':');
    
                    stateObj.attributes.hour = timeComponent[0];
                    stateObj.attributes.minute = parseInt(timeComponent[1]);
                }
            }

            if(entity_id === 'humidifier.money') {
                stateObj.attributes.humidity = 24;
            }
        }

        expect(computeStateDisplay(hass.localize, stateObj, hass.locale, state)).toBe(expected);
    })
});