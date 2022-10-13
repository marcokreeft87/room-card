import { ActionConfig, HomeAssistant, LovelaceCardConfig } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';

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
    hide_if?: HideIfConfig;
    stateObj: HomeAssistantEntity;
    attribute?: string;
    show_state?: boolean;
    styles?: EntityStyles;
    icon?: string | RoomCardIcon;
    template?: string;
}

export interface EntityStyles {
    [key: string]: string;
    template?: string;
}

export interface RoomCardConfig extends LovelaceCardConfig {    
    info_entities?: RoomCardEntity[];
    entities?: RoomCardEntity[];
    entity?: string;
    hide_title?: boolean;
    cards?: RoomCardLovelaceCardConfig[];
    entityIds: string[];
    hass?: HomeAssistant;
    icon?: string | RoomCardIcon;
    rows?: RoomCardRow[];
    show_icon?: boolean;
    title?: string;
    name?: string;
    styles?: EntityStyles;
    templates?: RoomCardTemplateContainer[];
    content_alignment?: RoomCardAlignment;
}

export enum RoomCardAlignment {
    Left = 'left',
    Center = 'center',
    Right = 'right'
}

export interface RoomCardRow {
    entities?: RoomCardEntity[];
    hide_if?: HideIfConfig;
    content_alignment?: RoomCardAlignment;
}

export interface HomeAssistantEntity extends HassEntity {
    entity_id: string;
    state: string;
}

export interface RoomCardIcon {
    conditions?: EntityCondition[];
    state_on?: string;
    state_off?: string;
    template?: RoomCardIconTemplate;
}

export interface RoomCardIconTemplate {
    icon?: string;
    styles?: string;
}

export interface HideIfConfig {    
    conditions?: EntityCondition[];
}

export interface EntityCondition {
    condition?: string;
    value?: string | number | boolean;
    attribute?: string;
    entity?: string;
    icon?: string;
    styles?: EntityStyles;
}

export interface FormattingOptions {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    style?: string;
    currency?: string;
}

export interface RoomCardTemplateContainer {    
    name: string;
    template: RoomCardTemplateDefinition;
}

export interface RoomCardTemplateDefinition {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export interface RoomCardLovelaceCardConfig extends LovelaceCardConfig {
    hide_if?: HideIfConfig;
}