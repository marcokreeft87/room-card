import {  CSSResult, html, LitElement, PropertyValues } from 'lit';
import {  property, customElement } from 'lit/decorators.js';
import { ActionConfig, handleClick, HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';

import { LAST_CHANGED, LAST_UPDATED, TIMESTAMP_FORMATS } from './lib/constants';
import { checkEntity, entityName, entityStateDisplay, entityStyles, entityIcon } from './entity';
import { getEntityIds, hasConfigOrEntitiesChanged, hideIf, isObject, getValue } from './util';
import { style } from './styles';
import { HomeAssistantEntity, RoomCardConfig, RoomCardEntity } from './types/room-card-types';

console.info(
    '%c ROOM-CARD %c 1.2.3',
    'color: cyan; background: black; font-weight: bold;',
    'color: darkblue; background: white; font-weight: bold;'
);

@customElement('room-card')
class RoomCard extends LitElement {
    @property() _hass?: HomeAssistant;
    @property() config?: RoomCardConfig;
    
    private entity: RoomCardEntity;
    private info_entities: RoomCardEntity[] = [];
    private entities: RoomCardEntity[] = [];
    private stateObj: HomeAssistantEntity | undefined;
    private _refCards: LovelaceCard[] = [];

    setConfig(config: RoomCardConfig) {
        if (!config || (!config.entities && !config.entity && !config.info_entities)) {
            throw new Error('Please define entities.');
        }
        if (config.entity) {
            checkEntity(config.entity);
        }
        if (config.entities) {
            config.entities.forEach((entity) => checkEntity(entity));
        }
        if (config.info_entities) {
            config.info_entities.forEach((entity) => checkEntity(entity));
        }

        this.config = { ...config, name: config.name === false ? ' ' : config.name, entityIds: getEntityIds(config) };
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return hasConfigOrEntitiesChanged(this.config, changedProps);
    }

    set hass(hass: HomeAssistant) {
        this._hass = hass;

        if (hass && this.config) {
            if (this.config.entity) {
                this.stateObj = hass.states[this.config.entity];

                const conf = typeof this.config.config === 'string' ? { entity: this.config.entity } : this.config.entity;
                this.entity = { ...conf, stateObj: conf.entity ? hass.states[conf.entity] : this.stateObj };
            }

            this.info_entities =
                this.config.info_entities?.map((config) => {
                    const conf = typeof config === 'string' ? { entity: config } : config;
                    return { ...conf, stateObj: conf.entity ? hass.states[conf.entity] : this.stateObj };
                }) ?? [];

            this.entities =
                this.config.entities?.map((config) => {
                    const conf = typeof config === 'string' ? { entity: config } : config;
                    return { ...conf, stateObj: conf.entity ? hass.states[conf.entity] : this.stateObj };
                }) ?? [];
            this._refCards = this.config.cards?.map((config) => {
                return this.createCardElement(config, hass);
            });

            this.config.hass = hass;
        }
    }

    createCardElement(cardConfig: LovelaceCardConfig, hass: HomeAssistant) {
        if (cardConfig.show_states && !cardConfig.show_states.includes(hass.states[cardConfig.entity].state)) {
            return;
        }

        const createError = (error: string, origConfig: LovelaceCardConfig) : LovelaceCard => {
            return createThing('hui-error-card', {
                type: 'error',
                error,
                origConfig,
            });
        };

        const createThing = (tag: string, config: LovelaceCardConfig) : LovelaceCard => {
            const element = document.createElement(tag) as LovelaceCard;
            try {
                element.setConfig(config);
            } catch (err) {
                console.error(tag, err);
                return createError(err.message, config);
            }
            return element;
        };

        let tag = cardConfig.type;
        if (tag.startsWith('divider')) {
            tag = `hui-divider-row`;
        } else if (tag.startsWith('custom:')) {
            tag = tag.substr('custom:'.length);
        } else {
            tag = `hui-${tag}-card`;
        }

        const element = createThing(tag, cardConfig);
        element.hass = hass;
        element.style.boxShadow = 'none';
        element.style.borderRadius = '0';
        return element;
    }

    static get styles(): CSSResult {
        return style;
    }

    render() {
        if (!this._hass || !this.config) return html``;

        return html`
            <ha-card elevation="2" style="${entityStyles(this.entity)}">
                <div class="card-header">
                    ${this.renderTitle(this.config)}
                    <div class="entities-info-row">
                        ${this.info_entities.map((entity) => this.renderInfoEntity(entity.stateObj, entity))}
                    </div>
                </div>
                <div class="${this.config.column ? 'entities-column' : 'entities-row'}">
                    ${this.entities.map((entity) => this.renderEntity(entity.stateObj, entity))}
                </div>
                ${this._refCards}
            </ha-card>
        `;
    }

    renderTitle(config: RoomCardConfig) {
        return config.hide_title === true ? '' : html`<div class="title">${this.renderMainEntity()} ${config.title}</div>`;
    }

    renderInfoEntity(stateObj: HomeAssistantEntity, config: RoomCardEntity) {
        if (!stateObj || hideIf(stateObj, config, this._hass)) {
            return null;
        }

        const onClick = this.clickHandler(stateObj.entity_id, config.tap_action);
        return html`<div class="state entity ${config.show_icon === true ? 'icon-entity' : ''}" style="${entityStyles(config)}" @click="${onClick}">${this.renderValue(stateObj, config)}</div>`;
    }

    renderEntity(stateObj: HomeAssistantEntity, config: RoomCardEntity) {
        if (!stateObj || hideIf(stateObj, config, this._hass)) {
            return null;
        }
        
        const entityValue = getValue(stateObj, config);
        const onClick = this.clickHandler(stateObj.entity_id, config.tap_action);
        const onDblClick = this.dblClickHandler(stateObj.entity_id, config.double_tap_action);        
        const onHold = this.holdHandler(stateObj.entity_id, config.hold_action);
        let held: boolean;
        let timer: number;
        let dblClickTimeout: number;

        const start = () => {
            held = false;
            
            timer = window.setTimeout(() => {
              held = true;
            }, 500);
          };
      
        const end = (ev: MouseEvent) => {
            // Prevent mouse event if touch event
            ev.preventDefault();
            if (['touchend', 'touchcancel'].includes(ev.type) && timer === undefined) {
              return;
            }
            window.clearTimeout(timer);
            timer = undefined;
            if (held) {
                onHold();
            } else if (config.double_tap_action !== undefined) {
              if ((ev.type === 'click' && (ev).detail < 2) || !dblClickTimeout) {
                dblClickTimeout = window.setTimeout(() => {
                  dblClickTimeout = undefined;                  
                  onClick();
                }, 250);
              } else {
                window.clearTimeout(dblClickTimeout);
                dblClickTimeout = undefined;
                onDblClick();
              }
            } else {
                onClick();
            }
        };

        return html`<div class="entity" style="${entityStyles(config)}"
        @mousedown="${start}" @mouseup="${end}" @touchstart="${start}" @touchend="${end}" @touchcancel="${end}"
        ">
            <span>${entityName(stateObj, config)}</span>
            <div>${this.renderIcon(stateObj, config)}</div>
            ${config.show_state ? html`<span>${entityValue}</span>` : ''}
        </div>`;
    }

    renderMainEntity() {
        if (!this.entity) {
            return null;
        }

        const onClick = this.clickHandler(this.stateObj.entity_id, this.config.tap_action);
        const onDblClick = this.dblClickHandler(this.stateObj.entity_id, this.config.double_tap_action);
        return html`<div
            class="main-state entity"
            style="${entityStyles(this.entity)}"
            @click="${onClick}"
            @dblclick="${onDblClick}"
        >
            ${this.entities.length === 0 || this.config.icon
                ? this.renderIcon(this.stateObj, this.entity, "main-icon")
                : this.renderValue(this.stateObj, this.entity)}
        </div>`;
    }

    renderValue(stateObj: HomeAssistantEntity, config: RoomCardEntity) {
        if (config.toggle === true) {
            return html`<ha-entity-toggle .stateObj="${stateObj}" .hass="${this._hass}"></ha-entity-toggle>`;
        }

        if (config.show_icon === true) {
            return this.renderIcon(stateObj, config);
        }

        if (config.attribute && [LAST_CHANGED, LAST_UPDATED].includes(config.attribute)) {
            return html`<ha-relative-time
                .hass=${this._hass}
                .datetime=${stateObj.attributes[config.attribute?.replace('-', '_')]}
                capitalize
            ></ha-relative-time>`;
        }
        if (config.format && TIMESTAMP_FORMATS.includes(config.format)) {
            const value = getValue(stateObj, config);
            const timestamp = new Date(value);
            if (!(timestamp instanceof Date) || isNaN(timestamp.getTime())) {
                return value;
            }
            return html`<hui-timestamp-display
                .hass=${this._hass}
                .ts=${timestamp}
                .format=${config.format}
                capitalize
            ></hui-timestamp-display>`;
        }
        return entityStateDisplay(this._hass, stateObj, config);
    }

    renderIcon(stateObj: HomeAssistantEntity, config: RoomCardEntity, classes? : string) {
        const customIcon = entityIcon(stateObj, config, this._hass);

        return html`<state-badge
            class="icon-small ${classes}"
            .stateObj="${stateObj}"
            .overrideIcon="${isObject(customIcon) ? customIcon.icon : customIcon}"
            .stateColor="${config.state_color}"
            style="${entityStyles(customIcon)}"
        ></state-badge>`;
    }

    renderWarning() {
        return html`<hui-warning>
            ${this._hass.localize('ui.panel.lovelace.warning.entity_not_found', 'entity', this.config.entity)}
        </hui-warning>`;
    }

    clickHandler(entity: string, actionConfig: ActionConfig) {
        return () => handleClick(this, this._hass, { entity, tap_action: actionConfig }, false, false);
    }

    dblClickHandler(entity: string, actionConfig: ActionConfig) {
        return () => handleClick(this, this._hass, { entity, double_tap_action: actionConfig }, false, true);
    }

    holdHandler(entity: string, actionConfig: ActionConfig) {
        return () => handleClick(this, this._hass, { entity, hold_action: actionConfig }, true, false);
    }
}
