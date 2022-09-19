import { HomeAssistant } from 'custom-card-helpers';
import { createMock } from 'ts-auto-mock';
import { HassEntity } from 'home-assistant-js-websocket';
import RoomCard from '../src/index';
import { HomeAssistantEntity, RoomCardConfig } from '../src/types/room-card-types';
import { getRenderString } from './utils';

describe('Testing index file class RoomCard', () => {
    const roomcard = new RoomCard();
    const hass = createMock<HomeAssistant>();
    const stateObj = createMock<HomeAssistantEntity>();
    
    stateObj.entity_id = 'light.test_entity';
    stateObj.attributes['icon'] = 'mdi:desk';
    stateObj.state = 'on';

    const hassEntity = createMock<HassEntity>();
    hass.states = {
        'light.test_entity': hassEntity
    }

    test('Calling setconfig should set config', () => {   

        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: "custom:room-card"
        }

        roomcard.setConfig(config);

        expect(roomcard.config).toMatchObject(config);
    }),
    test('Calling render without entities, info_entities and rows should return expected html', () => {   

        const config: RoomCardConfig = {
            entity: 'light.test_entity',
            entityIds: ['light.test_entity'],
            type: "custom:room-card",
            entities: []
        }

        roomcard.hass = hass;
        roomcard.setConfig(config);

        const result = roomcard.render();
        const htmlResult = getRenderString(result);
        
        expect(htmlResult).toMatch('<ha-card elevation="2" style=""> <div class="card-header"> <div class="title"><div class="main-state entity" style="" @click="" @dblclick=""> <state-badge class="icon-small main-icon" .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge> </div> </div> <div class="entities-info-row"> </div> </div> <div class="entities-row"></div> </ha-card>');
    })//,
    // test('Calling render without only entities should return expected html', () => {   

    //     const config: RoomCardConfig = {
    //         entity: 'light.test_entity',
    //         entityIds: ['light.test_entity'],
    //         type: "custom:room-card",
    //         entities: [{
    //             stateObj: stateObj
    //         }]
    //     }

    //     roomcard.hass = hass;
    //     roomcard.setConfig(config);

    //     const result = roomcard.render();
    //     const htmlResult = getRenderString(result);

    //     console.log(htmlResult);

    //     expect(htmlResult).toMatch('<ha-card elevation="2" style=""> <div class="card-header"> <div class="title"><div class="main-state entity" style="" @click="" @dblclick=""> <state-badge class="icon-small main-icon" .stateObj="" .overrideIcon="" .stateColor="" style="" ></state-badge> </div> </div> <div class="entities-info-row"> </div> </div> <div class="entities-row"></div> </ha-card>');
    // })
})

