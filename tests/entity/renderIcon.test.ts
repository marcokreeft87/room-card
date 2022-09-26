import { HomeAssistant } from "custom-card-helpers";
import { createMock } from "ts-auto-mock";
import { HassEntity } from 'home-assistant-js-websocket';
import { HomeAssistantEntity, RoomCardConfig, RoomCardEntity } from "../../src/types/room-card-types";
import { renderIcon } from "../../src/entity";
import { getRenderString } from "../utils";

describe('Testing entity file function renderIcon', () => {
    const hass = createMock<HomeAssistant>();
    const stateObj = createMock<HomeAssistantEntity>();
    
    stateObj.entity_id = 'light.test_entity';
    stateObj.attributes['icon'] = 'mdi:desk';
    stateObj.state = 'on';

    const hassEntity = createMock<HassEntity>();
    hass.states = {
        'sensor.test_entity': hassEntity
    }

    test('Passing HomeAssistantEntity, RoomCardConfig and HomeAssistant should render main icon', async () => {   

        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: "custom:room-card"
        }

        const result = renderIcon(stateObj, config, hass);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<state-badge class="icon-small " .stateObj="" .overrideIcon="mdi:desk" .stateColor="" style="" ></state-badge>');
    }),
    test('Passing HomeAssistantEntity, RoomCardConfig and HomeAssistant with show_icon should render nothing', async () => {   

        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: "custom:room-card",
            show_icon: false
        }

        const result = renderIcon(stateObj, config, hass);
        expect(result).toBeNull();
    }),
    test('Passing HomeAssistantEntity, RoomCardConfig and HomeAssistant should render config icon', async () => {   

        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: "custom:room-card",
            show_icon: true,
            icon: 'mdi:table'
        }

        const result = renderIcon(stateObj, config, hass);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<state-badge class="icon-small " .stateObj="" .overrideIcon="mdi:table" .stateColor="" style="" ></state-badge>');
    }),
    test('Passing HomeAssistantEntity, RoomCardConfig and HomeAssistant state_on/state_off should render state_on icon', async () => {   

        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: "custom:room-card",
            show_icon: true,
            icon: {
                state_on: 'mdi:on-icon',
                state_off: 'mdi:off-icon',
            }
        }

        const result = renderIcon(stateObj, config, hass);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<state-badge class="icon-small " .stateObj="" .overrideIcon="mdi:on-icon" .stateColor="" style="" ></state-badge>');
    }),
    test('Passing HomeAssistantEntity, RoomCardConfig and HomeAssistant and class should render css class', async () => {   

        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: "custom:room-card"
        }

        const result = renderIcon(stateObj, config, hass, 'main-icon');
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<state-badge class="icon-small main-icon" .stateObj="" .overrideIcon="mdi:desk" .stateColor="" style="" ></state-badge>');
    }),
    test.each`
    state | condition | value | icon | expected
    ${'on'}  ${'equals'}  ${'on'}  ${'mdi:equal-icon'}   ${'mdi:equal-icon'}
    ${'on'}  ${'equals'}  ${'off'}  ${'mdi:equal-icon'}   ${''}
    ${'55'}  ${'below'}  ${'60'}  ${'mdi:below-icon'}   ${'mdi:below-icon'}
    ${'70'}  ${'below'}  ${'60'}  ${'mdi:below-icon'}   ${''}
    ${'55'}  ${'above'}  ${'50'}  ${'mdi:above-icon'}   ${'mdi:above-icon'}
    ${'45'}  ${'above'}  ${'50'}  ${'mdi:above-icon'}   ${''}
    `('Passing HomeAssistantEntity, RoomCardConfig and HomeAssistant should render expected icon', async ({ state, condition, value, icon, expected }) => {   

        stateObj.state = state;
        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: "custom:room-card",
            show_icon: true,
            icon: {
                conditions: [{
                    condition: condition,
                    value: value,
                    icon: icon
                }]
            }
        }

        const result = renderIcon(stateObj, config, hass);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch(`<state-badge class="icon-small " .stateObj="" .overrideIcon="${expected}" .stateColor="" style="" ></state-badge>`);
    }),
    test('Passing HomeAssistantEntity, RoomCardConfig and HomeAssistant and styles should render styles', async () => {   

        stateObj.state = 'on';
        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: "custom:room-card",
            show_icon: true,
            icon: {
                conditions: [{
                    condition: 'equals',
                    value: 'on',
                    icon: 'mdi:table',
                    styles: {
                        color: 'red'
                    }
                }]
            }
        }

        const result = renderIcon(stateObj, config, hass);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<state-badge class="icon-small " .stateObj="" .overrideIcon="mdi:table" .stateColor="" style="color: red;" ></state-badge>');
    }),
    test('Passing HomeAssistantEntity, RoomCardEntity and HomeAssistant should render main icon', async () => {   

        const entity: RoomCardEntity = {
            entity: 'light.test_entity',
            stateObj: stateObj
        }

        const result = renderIcon(stateObj, entity, hass);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<state-badge class="icon-small " .stateObj="" .overrideIcon="mdi:desk" .stateColor="" style="" ></state-badge>');
    }),
    test('Passing HomeAssistantEntity, RoomCardEntity and HomeAssistant with show_icon should render nothing', async () => {   

        const entity: RoomCardEntity = {
            entity: 'light.test_entity',
            stateObj: stateObj,
            show_icon: false
        }

        const result = renderIcon(stateObj, entity, hass);
        expect(result).toBeNull();
    }),
    test('Passing HomeAssistantEntity, RoomCardEntity and HomeAssistant should render config icon', async () => {   

        const entity: RoomCardEntity = {
            entity: 'light.test_entity',
            stateObj: stateObj,
            show_icon: true,
            icon: 'mdi:table'
        }

        const result = renderIcon(stateObj, entity, hass);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<state-badge class="icon-small " .stateObj="" .overrideIcon="mdi:table" .stateColor="" style="" ></state-badge>');
    }),
    test('Passing HomeAssistantEntity, RoomCardEntity and HomeAssistant state_on/state_off should render state_on icon', async () => {   

        const entity: RoomCardEntity = {
            entity: 'light.test_entity',
            stateObj: stateObj,
            show_icon: true,
            icon: {
                state_on: 'mdi:on-icon',
                state_off: 'mdi:off-icon',
            }
        }

        const result = renderIcon(stateObj, entity, hass);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<state-badge class="icon-small " .stateObj="" .overrideIcon="mdi:on-icon" .stateColor="" style="" ></state-badge>');
    }),
    test('Passing HomeAssistantEntity, RoomCardEntity and HomeAssistant and class should render css class', async () => {   

        const entity: RoomCardEntity = {
            entity: 'light.test_entity',
            stateObj: stateObj
        }

        const result = renderIcon(stateObj, entity, hass, 'main-icon');
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<state-badge class="icon-small main-icon" .stateObj="" .overrideIcon="mdi:desk" .stateColor="" style="" ></state-badge>');
    }),
    test.each`
    state | condition | value | icon | expected
    ${'on'}  ${'equals'}  ${'on'}  ${'mdi:equal-icon'}   ${'mdi:equal-icon'}
    ${'on'}  ${'equals'}  ${'off'}  ${'mdi:equal-icon'}   ${''}
    ${'55'}  ${'below'}  ${'60'}  ${'mdi:below-icon'}   ${'mdi:below-icon'}
    ${'70'}  ${'below'}  ${'60'}  ${'mdi:below-icon'}   ${''}
    ${'55'}  ${'above'}  ${'50'}  ${'mdi:above-icon'}   ${'mdi:above-icon'}
    ${'45'}  ${'above'}  ${'50'}  ${'mdi:above-icon'}   ${''}
    `('Passing HomeAssistantEntity, RoomCardEntity and HomeAssistant should render expected icon', async ({ state, condition, value, icon, expected }) => {   

        stateObj.state = state;
        const entity: RoomCardEntity = {
            entity: 'light.test_entity',
            stateObj: stateObj,
            show_icon: true,
            icon: {
                conditions: [{
                    condition: condition,
                    value: value,
                    icon: icon
                }]
            }
        }

        const result = renderIcon(stateObj, entity, hass);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch(`<state-badge class="icon-small " .stateObj="" .overrideIcon="${expected}" .stateColor="" style="" ></state-badge>`);
    }),
    test('Passing HomeAssistantEntity, RoomCardEntity and HomeAssistant and styles should render styles', async () => {   

        stateObj.state = 'on';
        const entity: RoomCardEntity = {
            entity: 'light.test_entity',
            stateObj: stateObj,
            show_icon: true,
            icon: {
                conditions: [{
                    condition: 'equals',
                    value: 'on',
                    icon: 'mdi:table',
                    styles: {
                        color: 'red'
                    }
                }]
            }
        }

        const result = renderIcon(stateObj, entity, hass);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<state-badge class="icon-small " .stateObj="" .overrideIcon="mdi:table" .stateColor="" style="color: red;" ></state-badge>');
    }),
    test('Passing config with icon template icon should return expected html', () => {    

        stateObj.state = '18';
        const entity: RoomCardEntity = {
            entity: 'light.test_entity',
            stateObj: stateObj,
            show_icon: true,
            icon: {
                template: {
                    icon: "if (entity.state >= 70) return 'mdi:test';  else if (entity.state >= 20) return 'mdi:test2';  else return 'mdi:test3';",
                    styles: "if (entity.state >= 70) return 'color:green';  else if (entity.state >= 20) return 'color:orange';  else return 'color:red';"
                }
            }
        }

        const result = renderIcon(stateObj, entity, hass);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<state-badge class="icon-small " .stateObj="" .overrideIcon="mdi:test3" .stateColor="" style="color:red" ></state-badge>');
    })
});