import { ActionConfig, ActionHandlerOptions, HomeAssistant, LovelaceCardConfig } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';

export interface RoomCardEntity {
    name?: string | RoomCardAttributeTemplate; // main
    entity?: string; // main, info
    tap_action?: ActionConfig;
    hold_action?: ActionConfig;
    double_tap_action?: ActionConfig;
    state_color?: boolean;  // main
    show_name?: boolean; // main
    show_icon?: boolean; // main
    toggle?: boolean; // x
    format?: string;
    unit?: string;
    hide_unavailable?: boolean;
    hide_if?: HideIfConfig;
    stateObj: HomeAssistantEntity;
    attribute?: string; // x
    show_state?: boolean; // x
    styles?: EntityStyles | RoomCardAttributeTemplate;
    icon?: string | RoomCardIcon; // half
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
    title?: string | RoomCardAttributeTemplate;
    styles?: EntityStyles | RoomCardAttributeTemplate;
    templates?: RoomCardTemplateContainer[];
    content_alignment?: RoomCardAlignment;
    tap_action?: ActionConfig;
    hold_action?: ActionConfig;
    double_tap_action?: ActionConfig;
    card_styles?: EntityStyles;
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
    condition?: ConditionOption;
    value?: string | number | boolean;
    attribute?: string;
    entity?: string;
    icon?: string;
    styles?: EntityStyles;
}

export enum ConditionOption {
    Equals = 'equals',
    NotEquals = 'not_equals',
    Above = 'above',
    Below = 'below'
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
    cards?: RoomCardLovelaceCardConfig[];
    entities?: (string | { entity: string })[];
}

export interface RoomCardAttributeTemplate {
    template: string;
}

export interface ActionHandler extends HTMLElement {
    holdTime: number;
    bind(element: Element, options: ActionHandlerOptions): void;
}

export interface ActionHandlerElement extends HTMLElement {
    actionHandler?: boolean;
}

export enum CustomIconDomain {
    InputBoolean = 'input_boolean',
    Light = 'light',
    Switch = 'switch',
    BinarySensor = 'binary_sensor',
}