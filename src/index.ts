import {  CSSResult, html, LitElement, PropertyValues, TemplateResult } from 'lit';
import {  property, customElement } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCard } from 'custom-card-helpers';

import { checkConfig, entityStyles, renderEntitiesRow, renderInfoEntity, renderTitle } from './entity';
import { getEntityIds, hasConfigOrEntitiesChanged, mapStateObject, createCardElement } from './util';
import { style } from './styles';
import { HomeAssistantEntity, RoomCardConfig, RoomCardEntity, RoomCardRow } from './types/room-card-types';
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
            if (this.config.entity != undefined) {
                this.stateObj = hass.states[this.config.entity];
                this.entity = { ...this.config, stateObj: this.stateObj };
            }

            this.info_entities = this.config.info_entities?.map(entity => mapStateObject(entity, hass)) ?? [];

            this.entities = this.config.entities?.map(entity => mapStateObject(entity, hass)) ?? [];
            this.rows = 
                this.config.rows?.map((row) => {
                    const rowEntities = row.entities?.map(entity => mapStateObject(entity, hass));
                    return { entities: rowEntities };
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
                        this.rows.map((row) => {
                        return renderEntitiesRow(row.entities, this._hass, this, "width-100");
                        })
                    : renderEntitiesRow(this.entities, this._hass, this)}
                    ${this._refCards}
                </ha-card>
            `;
        } catch (error) {
            return html`<hui-warning>${error.toString()}</hui-warning>`;
        }
    }
}