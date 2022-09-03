import { css, html, LitElement } from 'lit';
import { handleClick } from 'custom-card-helpers';

import { LAST_CHANGED, LAST_UPDATED, TIMESTAMP_FORMATS } from './lib/constants';
import { checkEntity, entityName, entityStateDisplay, entityStyles, entityIcon } from './entity';
import { getEntityIds, hasConfigOrEntitiesChanged, hideIf } from './util';
import { style } from './styles';

console.info(
    '%c ROOM-CARD %c 1.0.0',
    'color: cyan; background: black; font-weight: bold;',
    'color: darkblue; background: white; font-weight: bold;'
);

class RoomCard extends LitElement {
    static get properties() {
        return {
            _hass: Object,
            config: Object,
            stateObj: Object,
            _refCards: [],
        };
    }

    setConfig(config) {
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

        this.entityIds = getEntityIds(config);

        this.config = { ...config, name: config.name === false ? ' ' : config.name };
    }

    shouldUpdate(changedProps) {
        return hasConfigOrEntitiesChanged(this, changedProps);
    }

    set hass(hass) {
        this._hass = hass;

        if (hass && this.config) {
            if (this.config.entity) {
                this.stateObj = hass.states[this.config.entity];

                const conf = typeof config === 'string' ? { entity: this.config.entity } : this.config.entity;
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
        }
    }

    createCardElement(cardConfig, hass) {
        if (cardConfig.show_states && !cardConfig.show_states.includes(hass.states[cardConfig.entity].state)) {
            return;
        }

        const createError = (error, origConfig) => {
            return createThing('hui-error-card', {
                type: 'error',
                error,
                origConfig,
            });
        };

        const createThing = (tag, config) => {
            const element = document.createElement(tag);
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

    static get styles() {
        return style(css);
    }

    render() {
        if (!this._hass || !this.config) return html``;

        return html`
            <ha-card elevation="2" style="${entityStyles(this.config)}">
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

    renderTitle(config) {
        return config.hide_title === true ? '' : html`<div class="title">${this.renderMainEntity()} ${config.title}</div>`;
    }

    renderInfoEntity(stateObj, config) {
        if (!stateObj || hideIf(stateObj, config, this._hass)) {
            return null;
        }

        const onClick = this.clickHandler(stateObj.entity_id, config.tap_action);
        return html`<div class="state entity ${config.show_icon === true ? 'icon-entity' : ''}" style="${entityStyles(config)}" @click="${onClick}">${this.renderValue(stateObj, config)}</div>`;
    }

    renderEntity(stateObj, config) {
        if (!stateObj || hideIf(stateObj, config, this._hass)) {
            return null;
        }

        const onClick = this.clickHandler(stateObj.entity_id, config.tap_action);
        const onDblClick = this.dblClickHandler(stateObj.entity_id, config.double_tap_action);
        return html`<div class="entity" style="${entityStyles(config)}" @click="${onClick}" @dblclick="${onDblClick}">
            <span>${entityName(stateObj, config)}</span>
            <div>${this.renderIcon(stateObj, config)}</div>
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
            style="${entityStyles(this.config)}"
            @click="${onClick}"
            @dblclick="${onDblClick}"
        >
            ${this.entities.length === 0 || this.config.icon
                ? this.renderIcon(this.stateObj, this.config, "main-icon")
                : this.renderValue(this.stateObj, this.config)}
        </div>`;
    }

    renderValue(stateObj, config) {
        if (config.toggle === true) {
            return html`<ha-entity-toggle .stateObj="${stateObj}" .hass="${this._hass}"></ha-entity-toggle>`;
        }

        if (config.show_icon === true) {
            return this.renderIcon(stateObj, config);
        }

        if (config.attribute && [LAST_CHANGED, LAST_UPDATED].includes(config.attribute)) {
            return html`<ha-relative-time
                .hass=${this._hass}
                .datetime=${stateObj[config.attribute?.replace('-', '_')]}
                capitalize
            ></ha-relative-time>`;
        }
        if (config.format && TIMESTAMP_FORMATS.includes(config.format)) {
            const value = config.attribute ? stateObj.attributes[config.attribute] : stateObj.state;
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

    renderIcon(stateObj, config, classes) {
        return html`<state-badge
            class="icon-small ${classes}"
            .stateObj="${stateObj}"
            .overrideIcon="${entityIcon(stateObj, config)}"
            .stateColor="${config.state_color}"
        ></state-badge>`;
    }

    renderWarning() {
        return html`<hui-warning>
            ${this._hass.localize('ui.panel.lovelace.warning.entity_not_found', 'entity', this.config.entity)}
        </hui-warning>`;
    }

    clickHandler(entity, actionConfig) {
        return () => handleClick(this, this._hass, { entity, tap_action: actionConfig }, false, false);
    }

    dblClickHandler(entity, actionConfig) {
        return () => handleClick(this, this._hass, { entity, double_tap_action: actionConfig }, true, false);
    }
}

customElements.define('room-card', RoomCard);
