import EditorForm from "@marcokreeft/ha-editor-formbuilder";
import { FormControlType, FormControlTab, mwcTabBarEvent } from "@marcokreeft/ha-editor-formbuilder/dist/interfaces";
import { getDropdownOptionsFromEnum } from "@marcokreeft/ha-editor-formbuilder/dist/utils/entities";
import { TemplateResult, css, html } from "lit";
import { CARD_EDITOR_NAME } from "./consts";
import { customElement } from "lit/decorators.js";
import { RoomCardAlignment, RoomCardEntity } from "./types/room-card-types";

@customElement(CARD_EDITOR_NAME)
export class RoomcardEditor extends EditorForm {
    protected _selectedTabIndex = 0;

    protected render(): TemplateResult {
        if (!this._hass || !this._config) {
            return html``;
        }

        const tabs: FormControlTab[] = [{
            label: "Main entity",
            rows: this.renderMainEntity()
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

    private renderMainEntity() {
        const contentAlignments = getDropdownOptionsFromEnum(RoomCardAlignment);     
        return [
            { 
                controls: [
                    { label: "Entity", configValue: "entity", type: FormControlType.EntityDropdown },
                ] 
            },
            {  
                cssClass: "side-by-side",
                controls: [
                    { label: "State color", configValue: "state_color", type: FormControlType.Switch },
                    { label: "Show state", configValue: "show_state", type: FormControlType.Switch },
                    { label: "Show icon", configValue: "show_icon", type: FormControlType.Switch },
                    { hidden: !this._config.show_icon, label: "Icon", configValue: "icon", value: this._config.icon, type: FormControlType.Icon } ,
                    { label: "Hide title", configValue: "hide_title", type: FormControlType.Switch },
                    { hidden: this._config.hide_title, label: "Title", configValue: "title", type: FormControlType.Textbox }
                ]
            },
            { controls: [{ label: "Content alignment", configValue: "content_alignment", type: FormControlType.Dropdown, items: contentAlignments } ] }
        ];
    }

    private renderInfoEntities() {
        const entityTabs: FormControlTab[] = [];
        this._config.info_entities?.forEach((entity: RoomCardEntity, index: number) => {
            const entityAttributes = this._hass.states[entity.entity]?.attributes;
            const options = entityAttributes ? Object.keys(entityAttributes).map((key: string) => ({ label: key, value: key })) : [];

            entityTabs.push({
                label: `${index + 1}`,
                rows: [{
                    cssClass: "form-control-attributes",
                    controls: [{ label: `Entity ${index + 1}`, configValue: `info_entities[${index}].entity`, value: entity.entity, type: FormControlType.EntityDropdown }]
                },
                {
                    cssClass: "side-by-side",
                    controls: [
                        // { label: "State color", configValue: `info_entities[${index}].state_color`, value: entity.state_color?.toString(), type: FormControlType.Switch },
                        // { label: "Show state", configValue: `info_entities[${index}].show_state`, value: entity.show_state?.toString(), type: FormControlType.Switch },
                        { label: "Show icon", configValue: `info_entities[${index}].show_icon`, value: entity.show_icon?.toString(), type: FormControlType.Switch },
                        { label: "Icon", configValue: `info_entities[${index}].icon`, value: entity.icon as string, type: FormControlType.Icon, hidden: !entity.show_icon },
                        { label: "Attribute", configValue: `info_entities[${index}].attribute`, value: entity.attribute, type: FormControlType.Dropdown, hidden: entity.show_icon, items: options }
                    ]
                }
                ]
            });

        });

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
        const entityTabs: FormControlTab[] = [];
        this._config.entities?.forEach((entity: RoomCardEntity, index: number) => {
            const entityAttributes = this._hass.states[entity.entity]?.attributes;
            const options = entityAttributes ? Object.keys(entityAttributes).map((key: string) => ({ label: key, value: key })) : [];

            entityTabs.push({
                label: `${index + 1}`,
                rows: [{
                    cssClass: "form-control-attributes",
                    controls: [{ label: `Entity ${index + 1}`, configValue: `entities[${index}].entity`, value: entity.entity, type: FormControlType.EntityDropdown }]
                },
                {
                    cssClass: "side-by-side",
                    controls: [
                        { label: "Show name", configValue: `entities[${index}].show_name`, value: entity.show_name?.toString(), type: FormControlType.Switch },
                        { type: FormControlType.Filler },
                        { label: "State color", configValue: `entities[${index}].state_color`, value: entity.state_color?.toString(), type: FormControlType.Switch },
                        { label: "Show state", configValue: `entities[${index}].show_state`, value: entity.show_state?.toString(), type: FormControlType.Switch },
                        { label: "Show icon", configValue: `entities[${index}].show_icon`, value: entity.show_icon?.toString(), type: FormControlType.Switch },
                        { label: "Icon", configValue: `entities[${index}].icon`, value: entity.icon as string, type: FormControlType.Icon, hidden: !entity.show_icon },
                        { label: "Attribute", configValue: `entities[${index}].attribute`, value: entity.attribute, type: FormControlType.Dropdown, hidden: entity.show_icon, items: options }
                    ]
                }
                ]
            });

        });

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

    static get styles() {
        return css`
            .form-row {
                margin-bottom: 10px;
            }
            .form-control {
                display: flex;
                align-items: center;
            }
            ha-switch {
                padding: 16px 6px;
            }
            .side-by-side {
                display: flex;
                flex-flow: row wrap;
            }            
            .side-by-side > label {
                width: 100%;
            }
            .side-by-side > .form-control {
                width: 49%;
                padding: 2px;
            }
            ha-textfield { 
                width: 100%;
            }
            .form-row-header {
                margin-top: 25px;
            }
            .form-row-header > button {
                float: right;
            }
            .form-row-header > label {
                font-size: 16px;
            }
            .form-control-attributes {
                margin-bottom: 20px;
            }
        `;
    }
}