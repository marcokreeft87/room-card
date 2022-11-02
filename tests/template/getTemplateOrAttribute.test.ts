import { HomeAssistant } from 'custom-card-helpers';
import { createMock } from 'ts-auto-mock';
import { getTemplateOrAttribute } from '../../src/template';
import { HomeAssistantEntity, RoomCardAttributeTemplate } from '../../src/types/room-card-types';;

describe('Testing template file function getTemplateOrAttribute', () => {
    const hass = createMock<HomeAssistant>();
    const stateObj = createMock<HomeAssistantEntity>();

    [
        [{ template : "if(true) return true;" } as RoomCardAttributeTemplate, true],
        ['test title', 'test title'],
        [33, 33]
    ].forEach(([attribute, expected]) => {
        test(`Passing ${attribute} as attribute, HomeAssistant and HomeAssistantEntity be ${expected}`, ()=>{
            expect(getTemplateOrAttribute(attribute, hass, stateObj)).toBe(expected);
        })
    })
})

