import { entityStyles } from '../../src/entity';
import { EntityStyles } from '../../src/types/room-card-types';

describe('Testing entity file function computeEntity', () => {
    test('Passing entity_id should return entity name', () => {  
        const styles: EntityStyles = {
            color: 'red',
            height: '100'
        }      
        expect(entityStyles(styles)).toBe('color: red;height: 100;');
    })
})