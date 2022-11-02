import { RoomCardConfig } from '../../src/types/room-card-types';
import { getEntityIds } from '../../src/util';
import { StubHomeAssistantEntity } from '../testdata';

describe('Testing util file function getEntityIds', () => {
    test('Passing only entity should return entityId', () => {
        const config: RoomCardConfig = {
            info_entities: [],
            entities: [],
            entity: 'sensor.entity',
            entityIds: [],
            type: ''
        } 
        expect(getEntityIds(config)).toMatchObject(['sensor.entity']);
    }),
    test('Passing nothing should return entityId', () => {
        const config: RoomCardConfig = {
            info_entities: [],
            entities: [],
            entity: '',
            entityIds: [],
            type: ''
        } 
        expect(getEntityIds(config)).toMatchObject([]);
    }),
    test('Passing entity and entities should return entityId and entities', () => {
        const config: RoomCardConfig = {
            info_entities: [],
            entities: [{
                entity: 'sensor.entity2',
                stateObj: StubHomeAssistantEntity
            }, {
                entity: 'sensor.entity3',
                stateObj: StubHomeAssistantEntity
            }],
            entity: 'sensor.entity',
            entityIds: [],
            type: ''
        } 
        expect(getEntityIds(config)).toMatchObject([
            'sensor.entity', 'sensor.entity2', 'sensor.entity3'
        ]);
    }),
    test('Passing entity and entities + info_entities + rows undefined should return entityId', () => {
        const config: RoomCardConfig = {
            info_entities: undefined,
            entities: undefined,
            entity: 'sensor.entity',
            rows: undefined,
            entityIds: [],
            type: ''
        } 
        expect(getEntityIds(config)).toMatchObject(['sensor.entity']);
    }),
    test('Passing entity + entities + info_entities + rows undefined should return entityId', () => {
        const config: RoomCardConfig = {
            info_entities: undefined,
            entities: undefined,
            entity: undefined,
            rows: undefined,
            entityIds: [],
            type: ''
        } 
        expect(getEntityIds(config)).toMatchObject([]);
    }),
    test('Passing entity, entities and info_entities should return entityId, entities and info_entities', () => {
        const config: RoomCardConfig = {
            info_entities: [{
                entity: 'sensor.entity4',
                stateObj: StubHomeAssistantEntity
            }, {
                entity: 'sensor.entity5',
                stateObj: StubHomeAssistantEntity
            }],
            entities: [{
                entity: 'sensor.entity2',
                stateObj: StubHomeAssistantEntity
            }, {
                entity: 'sensor.entity3',
                stateObj: StubHomeAssistantEntity
            }],
            entity: 'sensor.entity',
            entityIds: [],
            type: ''
        } 
        expect(getEntityIds(config)).toMatchObject([
            'sensor.entity', 'sensor.entity2', 'sensor.entity3', 'sensor.entity4', 'sensor.entity5'
        ]);
    }),
    test('Passing rows should return row entites', () => {
        const config: RoomCardConfig = {
            info_entities: undefined,
            entities: undefined,
            entity: undefined,
            rows: [{
                entities: [{
                    entity: 'sensor.entity',
                    stateObj: StubHomeAssistantEntity
                }, {
                    entity: 'sensor.entity2',
                    stateObj: StubHomeAssistantEntity
                }]
            }, {
                entities: [{
                    entity: 'sensor.entity3',
                    stateObj: StubHomeAssistantEntity
                }, {
                    entity: 'sensor.entity4',
                    stateObj: StubHomeAssistantEntity
                }]
            }],
            entityIds: [],
            type: ''
        } 
        expect(getEntityIds(config)).toMatchObject([
            'sensor.entity', 'sensor.entity2', 'sensor.entity3', 'sensor.entity4'
        ]);
    }),
    test('Passing cards should return row entites', () => {
        const config: RoomCardConfig = {
            info_entities: undefined,
            entities: undefined,
            entity: undefined,
            cards: [{
               type: 'custom:room-card',
               entity: 'sensor.entity',
            },
            {
                type: 'custom:room-card',
                entity: 'sensor.entity2',
             }],
            entityIds: [],
            type: ''
        } 
        expect(getEntityIds(config)).toMatchObject([
            'sensor.entity', 'sensor.entity2'
        ]);
    }),
    test('Passing entities with icon conditions should return entities and icon condition entities', () => {
        const config: RoomCardConfig = {
            info_entities: [{
                entity: 'sensor.entity',
                stateObj: StubHomeAssistantEntity,
                icon: {
                    conditions: [{
                        entity: 'sensor.icon_entity'
                    }]
                }
            }],
            entities: [{
                entity: 'sensor.entity2',
                stateObj: StubHomeAssistantEntity,
                icon: {
                    conditions: [{
                        entity: 'sensor.icon_entity2'
                    }]
                }
            }],
            rows: [{
                entities: [{
                    entity: 'sensor.entity3',
                    stateObj: StubHomeAssistantEntity,
                    icon: {
                        conditions: [{
                            entity: 'sensor.icon_entity3'
                        }]
                    }
                }]
            }],
            entity: undefined,
            entityIds: [],
            type: ''
        } 

        expect(getEntityIds(config)).toMatchObject([
            'sensor.entity2', 'sensor.entity', 'sensor.entity3', 'sensor.icon_entity2', 'sensor.icon_entity', 'sensor.icon_entity3'
        ]);
    })
})