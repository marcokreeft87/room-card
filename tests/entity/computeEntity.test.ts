import { computeEntity } from '../../src/entity';

describe('Testing util file function computeEntity', () => {
    test('Passing entity_id should return entity name', () => {        
        expect(computeEntity('sensor.test_entity')).toBe('test_entity');
    })
})

