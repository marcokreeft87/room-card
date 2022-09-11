import { HomeAssistant } from "custom-card-helpers";
import { HomeAssistantEntity, RoomCardEntity } from "../src/types/room-card-types";
import { createMock } from 'ts-auto-mock';

export const StubHomeAssistantEntity: HomeAssistantEntity = createMock<HomeAssistantEntity>();

export const StubRoomCardEntity: RoomCardEntity = {
    stateObj: StubHomeAssistantEntity
};

export const StubHomeAssistant: HomeAssistant = createMock<HomeAssistant>();