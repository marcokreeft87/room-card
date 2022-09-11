import { HomeAssistantEntity, RoomCardEntity } from "../src/types/room-card-types";

export const StubHomeAssistantEntity: HomeAssistantEntity = {
    entity_id: '',
    state: '',
    last_changed: '',
    last_updated: '',
    attributes: [],
    context: {
        id: '',
        user_id: null
    }
};

export const StubRoomCardEntity: RoomCardEntity = {
    stateObj: StubHomeAssistantEntity
};