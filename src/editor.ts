import EditorForm from "@marcokreeft/ha-editor-formbuilder";
import { FormControlTab, mwcTabBarEvent } from "@marcokreeft/ha-editor-formbuilder/dist/interfaces";
import { CSSResult, TemplateResult, html } from "lit";
import { CARD_EDITOR_NAME } from "./consts";
import { customElement } from "lit/decorators.js";
import { RoomCardConfig } from "./types/room-card-types";
import { style } from "./editor/styles";
import { renderEntityTabs, renderInfoEntityTabs, renderMainEntity } from "./editor/utils";

@customElement(CARD_EDITOR_NAME)
export class RoomcardEditor extends EditorForm {
    protected _selectedTabIndex = 0;

    protected render(): TemplateResult {
        if (!this._hass || !this._config) {
            return html``;
        }

        const tabs: FormControlTab[] = [{
            label: "Main entity",
            rows: renderMainEntity(this._config as RoomCardConfig)
        }, { 
            label: "Info entities",
            rows: this.renderInfoEntities()
        }, { 
            label: "Entities",
            rows: this.renderEntities()
        }];        

        return html`<mwc-tab-bar @MDCTabBar:activated=${(ev: mwcTabBarEvent) => {
            this._selectedTabIndex = ev.detail.index;
            this.requestUpdate();
        }}>
            ${tabs.map(tab => html`<mwc-tab label="${tab.label}"></mwc-tab>`)}
            </mwc-tab-bar>
            <section>
                <article>${this.renderForm(tabs[this._selectedTabIndex].rows)}</article>
            </section>`;
    }

    private renderInfoEntities() {
        const entityTabs: FormControlTab[] = renderInfoEntityTabs(this._config as RoomCardConfig, this._hass);

        return [{
            label: "Info entities",
            cssClass: "form-row-header",
            tabs: entityTabs,
            buttons: [
                {
                    icon: "mdi:plus",
                    label: "Add info entity",
                    action: () => {
                        this._config.info_entities = [...this._config.info_entities ?? [], { entity: "" }];
                        this.requestUpdate();
                    }
                }
            ]
        }];
    }

    private renderEntities() {
        const entityTabs: FormControlTab[] = renderEntityTabs(this._config as RoomCardConfig, this._hass);

        return [{
            label: "Entities",
            cssClass: "form-row-header",
            tabs: entityTabs,
            buttons: [
                {
                    icon: "mdi:plus",
                    label: "Add entity",
                    action: () => {
                        this._config.entities = [...this._config.entities ?? [], { entity: "" }];
                        this.requestUpdate();
                    }
                }
            ]
        }];
    }

    static get styles(): CSSResult {
        return style;
    }
}