import { ActionConfig, HomeAssistant, LovelaceCardConfig } from 'custom-card-helpers';

export interface RoomCardEntity {
    name?: string;
    entity?: string;
    tap_action?: ActionConfig;
    hold_action?: ActionConfig;
    double_tap_action?: ActionConfig;
    state_color?: boolean;
    show_name?: boolean;
    show_icon?: boolean;
    toggle?: boolean;
    format?: string;
    unit?: string;
    hide_unavailable?: boolean;
    hide_if?: string | EntityCondition[];
    stateObj: HomeAssistantEntity | undefined;
    attribute?: string;
    show_state?: boolean;
    styles?: any;
    icon?: string | RoomCardIcon;
}

export interface RoomCardConfig extends LovelaceCardConfig {    
    info_entities: RoomCardEntity[];
    entities: RoomCardEntity[];
    entity: any;
    hide_title?: boolean;
    cards?: LovelaceCardConfig[];
    entityIds: string[];
    hass?: HomeAssistant;
}

export interface HomeAssistantEntity {
    entity_id: string;
    attributes: any;
    state: any;
}

export interface RoomCardIcon {
    conditions?: EntityCondition[];
    state_on?: string;
    state_off?: string;
}

export interface EntityCondition {
    condition: string;
    value: any;
    attribute: string;
    entity?: string;
}