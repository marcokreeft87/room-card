import { CSSResult, html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCard, LovelaceCardConfig, createThing } from 'custom-card-helpers';

import { checkConfig, entityStyles, renderEntitiesRow, renderInfoEntity, renderRows, renderTitle } from './entity';
import { getEntityIds, hasConfigOrEntitiesChanged, mapStateObject } from './util';
import { hideIfCard } from './hide';
import { style } from './styles';
import { HomeAssistantEntity, RoomCardConfig, RoomCardEntity, RoomCardLovelaceCardConfig, RoomCardRow } from './types/room-card-types';
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
    @property() _hass?: HomeAssistant;
    @property() config?: RoomCardConfig;

    private entity: RoomCardEntity | undefined;
    private info_entities: RoomCardEntity[] = [];
    private entities: RoomCardEntity[] = [];
    private rows: RoomCardRow[] = [];
    private stateObj: HomeAssistantEntity | undefined;
    private _refCards: LovelaceCard[] = [];
    private _helpers: { createCardElement(config: LovelaceCardConfig): LovelaceCard };

    async setConfig(config: RoomCardConfig) {
        checkConfig(config);

        this.config = { ...config, entityIds: getEntityIds(config) };

        /* eslint-disable @typescript-eslint/no-explicit-any */
        if ((window as any).loadCardHelpers) {
            this._helpers = await (window as any).loadCardHelpers();
        }
        /* eslint-enable @typescript-eslint/no-explicit-any */
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return hasConfigOrEntitiesChanged(this.config, changedProps);
    }

    set hass(hass: HomeAssistant) {
        this._hass = hass;

        if (hass && this.config) {
            this.stateObj = this.config.entity !== undefined ? hass.states[this.config.entity] : undefined;
            this.entity = this.config.entity !== undefined ? { ...this.config, stateObj: this.stateObj } : undefined;

            this.info_entities = this.config.info_entities?.map(entity => mapStateObject(entity, hass, this.config)) ?? [];

            this.entities = this.config.entities?.map(entity => mapStateObject(entity, hass, this.config)) ?? [];
            this.rows =
                this.config.rows?.map((row) => {
                    const rowEntities = row.entities?.map(entity => mapStateObject(entity, hass, this.config));
                    return { entities: rowEntities, hide_if: row.hide_if, content_alignment: row.content_alignment };
                }) ?? [];

            this._refCards = this.config.cards?.map((card) => this.createCardElement(card, hass));

            this.config.hass = hass;
        }
    }

    static get styles(): CSSResult {
        return style;
    }

    render() : TemplateResult<1> {
        if (!this._hass || !this.config) return html``;

        try {
            return html`
                <ha-card elevation="2" style="${entityStyles(this.config.card_styles, this.stateObj, this._hass)}">
                    <div class="card-header">
                        ${renderTitle(this.config, this._hass, this, this.entity)}
                        <div class="entities-info-row">
                            ${this.info_entities.map((entity) => renderInfoEntity(entity, this._hass, this))}
                        </div>
                    </div>
                    ${this.rows !== undefined && this.rows.length > 0 ? 
                        renderRows(this.rows, this._hass, this) : 
                        renderEntitiesRow(this.config, this.entities, this._hass, this)}
                    ${this._refCards}
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
