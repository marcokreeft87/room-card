import { RoomCardAlignment, RoomCardConfig } from "../../src/types/room-card-types";
import { renderClasses } from "../../src/util";

describe('Testing util file function renderClasses', () => {
    test.each`
    content_alignment | expected
    ${RoomCardAlignment.Left}  ${'entities-row content-left'}
    ${RoomCardAlignment.Center}  ${'entities-row content-center'}
    ${RoomCardAlignment.Right}  ${'entities-row content-right'}
    ${undefined}  ${'entities-row content-left'}
    `('Passing content_alignment return expected classes', ({ content_alignment, expected }) => {  
        const config: RoomCardConfig = {
            entityIds: [],
            type: "",
            content_alignment: content_alignment
        }
        expect(renderClasses(config)).toBe(expected);
    })
});