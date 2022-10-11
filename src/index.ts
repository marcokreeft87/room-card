import { CSSResult, html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';

import { checkConfig, entityStyles, renderEntitiesRow, renderInfoEntity, renderRows, renderTitle } from './entity';
import { getEntityIds, hasConfigOrEntitiesChanged, mapStateObject, createCardElement } from './util';
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
    private _refCards: RoomCardLovelaceCardConfig[] = [];

    setConfig(config: RoomCardConfig) {        

        checkConfig(config);     

        this.config = { ...config, entityIds: getEntityIds(config) };
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
                    return { entities: rowEntities, hide_if: row.hide_if };
                }) ?? [];

            this._refCards = this.config.cards?.map(card => createCardElement(card, hass));

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
                <ha-card elevation="2" style="${entityStyles(this.entity?.styles)}">
                    <div class="card-header">
                        ${renderTitle(this.entity, this.config, this._hass, this)}
                        <div class="entities-info-row">
                            ${this.info_entities.map((entity) => renderInfoEntity(entity, this._hass, this))}
                        </div>
                    </div>
                    ${this.rows !== undefined && this.rows.length > 0 ? 
                        renderRows(this.rows, this._hass, this) : 
                        renderEntitiesRow(this.entities, this._hass, this)}
                    ${this._refCards}
                </ha-card>
            `;
        } catch (error) {
            return html`<hui-warning>${error.toString()}</hui-warning>`;
        }
    }
}