import { CSSResult, html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCard, LovelaceCardConfig, createThing } from 'custom-card-helpers';
import { HassEntities } from 'home-assistant-js-websocket/dist';

import { checkConfig, entityStyles, renderEntitiesRow, renderInfoEntity, renderRows, renderTitle } from './entity';
import { getEntityIds, parseConfig } from './util';
import { hideIfCard } from './hide';
import { style } from './styles';
import { RoomCardConfig, RoomCardLovelaceCardConfig } from './types/room-card-types';
import * as packageJson from '../package.json';

console.info(
    `%c ROOM-CARD %c ${packageJson.version}`,
    'color: cyan; background: black; font-weight: bold;',
    'color: darkblue; background: white; font-weight: bold;'
);

/* eslint-disable @typescript-eslint/no-explicit-any */
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: 'room-card',
    name: 'Room card',
    preview: false,
    description: 'Show multiple entity states, attributes and icons in a single card in Home Assistant\'s Lovelace UI',
});
/* eslint-enable @typescript-eslint/no-explicit-any */

@customElement('room-card')
export default class RoomCard extends LitElement {
    private _hass?: HomeAssistant;
    @property() monitoredStates?: HassEntities = {};
    @property() config?: RoomCardConfig;
    @property() _helpers: { createCardElement(config: LovelaceCardConfig): LovelaceCard }

    getChildCustomCardTypes(cards: RoomCardLovelaceCardConfig[], target: Set<string>) {
        if (!cards) return;

        for (const card of cards) {
            if (card.type.indexOf('custom:') === 0) {
                target.add(card.type.substring(7, card.type.length));
            }
            this.getChildCustomCardTypes(card.cards, target)
        }
    }

    async waitForDependentComponents(config: RoomCardConfig) {
        const distinctTypes = new Set<string>();
        this.getChildCustomCardTypes(config.cards, distinctTypes);
        await Promise.all(Array.from(distinctTypes).map(type => customElements.whenDefined(type)));
    }

    async setConfig(config: RoomCardConfig) {
        checkConfig(config);
        const entityIds = getEntityIds(config);
        this.config = { ...config, entityIds: entityIds };

        await this.waitForDependentComponents(config);

        /* istanbul ignore next */
        /* eslint-disable @typescript-eslint/no-explicit-any */
        if ((window as any).loadCardHelpers) {
            this._helpers = await (window as any).loadCardHelpers();
        }
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        const result = this.monitoredStates !== undefined
            && this.config !== undefined
            && changedProps.size > 0
            && this._helpers !== undefined
            && this._helpers.createCardElement !== undefined;

        return result;
    }

    updateMonitoredStates(hass: HomeAssistant): void {
        const newStates = { ...this.monitoredStates };
        let anyUpdates = false;

        for (const entityId of this.config.entityIds) {
            if (entityId in hass.states) {
                const monitoredEntity = this.monitoredStates && this.monitoredStates[entityId];
                
                /* istanbul ignore next */
                if (!this.monitoredStates || monitoredEntity?.last_updated < hass.states[entityId].last_updated ||
                    monitoredEntity?.last_changed < hass.states[entityId].last_changed) {
                    anyUpdates = hass.states[entityId] !== newStates[entityId];
                    newStates[entityId] = hass.states[entityId];
                }
            } else if (this.monitoredStates && entityId in this.monitoredStates) {
                anyUpdates = true;
                delete newStates[entityId];
            }
        }

        if (anyUpdates) {
            this.monitoredStates = newStates;
        }
    }

    @property()
    get hass() { return this._hass; }
    set hass(hass: HomeAssistant) {
        this.updateMonitoredStates(hass);        
        this._hass = hass;
    }

    static get styles(): CSSResult {
        return style;
    }

    render(): TemplateResult<1> {
        if (!this._hass || !this.config) return html``;

        const { entity, info_entities, entities, rows, stateObj } = parseConfig(this.config, this._hass);

        try {
            return html`
                <ha-card elevation="2" style="${entityStyles(this.config.card_styles, stateObj, this._hass)}">
                    <div class="card-header">
                        ${renderTitle(this.config, this._hass, this, entity)}
                        <div class="entities-info-row">
                            ${info_entities.map((entity) => renderInfoEntity(entity, this._hass, this))}
                        </div>
                    </div>
                    ${rows !== undefined && rows.length > 0 ?
                    renderRows(rows, this._hass, this) :
                    renderEntitiesRow(this.config, entities, this._hass, this)}
                    ${this.config.cards?.map((card) => this.createCardElement(card, this._hass))}
                </ha-card>
            `;
        } catch (error) {
            return html`<hui-warning>${error.toString()}</hui-warning>`;
        }
    }

    getCardSize() {
        const numberOfCards = this.config.cards ? this.config.cards.length : 0;
        const numberOfRows = this.config.rows ? this.config.rows.length : 0;
        const mainSize = !this.config.info_entities && this.config.hide_title ? 1 : 2;

        return numberOfCards + numberOfRows + (this.config.entities ? this.config.entities.length > 0 ? 1 : 0 : 0) + mainSize;
    }

    createCardElement(config: RoomCardLovelaceCardConfig, hass: HomeAssistant) {
        if (
            hideIfCard(config, hass) ||
            (config.show_states && !config.show_states.includes(hass.states[config.entity].state))
        ) {
            return;
        }

        let element: LovelaceCard;

        if (this._helpers) {
            element = this._helpers.createCardElement(config);
        } else {
            element = createThing(config);
        }

        element.hass = hass;
        element.style.boxShadow = 'none';
        element.style.borderRadius = '0';

        return element;
    }
}
