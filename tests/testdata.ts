import { HomeAssistant } from "custom-card-helpers";
import { HassEntity } from 'home-assistant-js-websocket';
import { HomeAssistantEntity, RoomCardEntity } from "../src/types/room-card-types";
import { createMock } from 'ts-auto-mock';

export const StubHomeAssistantEntity: HomeAssistantEntity = createMock<HomeAssistantEntity>();

export const StubRoomCardEntity: RoomCardEntity = {
    stateObj: StubHomeAssistantEntity
};

export const StubHomeAssistant: HomeAssistant = createMock<HomeAssistant>();
export const StubHassEntity: HassEntity = createMock<HassEntity>();