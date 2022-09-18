import { HomeAssistant } from "custom-card-helpers";
import { createMock } from "ts-auto-mock";
import { HassEntity } from 'home-assistant-js-websocket';
import { HomeAssistantEntity, RoomCardConfig } from "../../src/types/room-card-types";
import { renderIcon } from "../../src/entity";

describe('Testing util file function renderIcon', () => {
    const hass = createMock<HomeAssistant>();
    const stateObj = createMock<HomeAssistantEntity>();

    test('Passing HomeAssistantEntity, RoomCardConfig and HomeAssistant should render main icon', async () => {   

        stateObj.entity_id = 'sensor.test_entity';

        const hassEntity = createMock<HassEntity>();
        hassEntity.state = '15';
        hass.states = {
            'sensor.test_entity': hassEntity
        }

        const config: RoomCardConfig = {
            entity: 'sensor.test_entity',
            entityIds: ['sensor.test_entity'],
            type: "custom:room-card"
        }

        expect(renderIcon(stateObj, config, hass)).toMatch('');
    })
});