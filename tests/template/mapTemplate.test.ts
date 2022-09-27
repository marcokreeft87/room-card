import { createMock } from 'ts-auto-mock';
import { mapTemplate } from '../../src/template';
import { RoomCardConfig, RoomCardEntity } from '../../src/types/room-card-types';

describe('Testing template file function mapTemplate', () => {
    const entity = createMock<RoomCardEntity>();
    entity.template = 'test_template';

    test('Passing entity and config with templates should map properties', () => {        

        const config: RoomCardConfig = {
            entityIds: [],
            type: '',
            templates: [{
                name: 'test_template',
                template: {
                    'show_icon': true,
                    'show_state': true
                }
            }]
        }

        const expectedEntity: RoomCardEntity = { stateObj: entity.stateObj, show_icon: true, show_state: true  };
        expect(mapTemplate(entity, config)).toMatchObject(expectedEntity);
    }),
    test('Passing entity and config with complex templates should map properties', () => {        

        const config: RoomCardConfig = {
            entityIds: [],
            type: '',
            templates: [{
                name: 'test_template',
                template: {
                    'show_icon': true,
                    'show_state': true,
                    'icon': {
                        conditions: [{
                            condition: 'above',
                            value: '1',
                            icon: 'mdi:test'
                        }]
                    }
                }
            }]
        }

        const expectedEntity: RoomCardEntity = { 
            stateObj: entity.stateObj, 
            show_icon: true, 
            show_state: true, 
            icon: {
                conditions: [{
                    condition: 'above',
                    value: '1',
                    icon: 'mdi:test'
                }]
            }
        };
        expect(mapTemplate(entity, config)).toMatchObject(expectedEntity);
    })
});