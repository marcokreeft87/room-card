import EditorForm from "@marcokreeft/ha-editor-formbuilder";
import { FormControlType, FormControlRow } from "@marcokreeft/ha-editor-formbuilder/dist/interfaces";
import { getDropdownOptionsFromEnum } from "@marcokreeft/ha-editor-formbuilder/dist/utils/entities";
import { TemplateResult, html } from "lit";
import { CARD_EDITOR_NAME } from "./consts";
import { customElement } from "lit/decorators.js";
import { RoomCardAlignment, RoomCardEntity } from "./types/room-card-types";

@customElement(CARD_EDITOR_NAME)
export class RoomcardEditor extends EditorForm {

    protected render(): TemplateResult {
        if (!this._hass || !this._config) {
            return html``;
        }

        const contentAlignments = getDropdownOptionsFromEnum(RoomCardAlignment);       

        const formRows: FormControlRow[] = [
            { 
                label: "Main entity",
                controls: [
                    { label: "Entity", configValue: "entity", type: FormControlType.EntityDropdown },
                ] 
            },
            {  
                cssClass: "side-by-side",
                controls: [
                    { label: "Show icon", configValue: "show_icon", type: FormControlType.Switch },
                    { label: "Hide title", configValue: "hide_title", type: FormControlType.Switch }
                ]
            },
            { hidden: !this._config.show_icon, controls: [{ label: "Icon", configValue: "icon", type: FormControlType.Textbox } ] },
            { hidden: this._config.hide_title, controls: [{ label: "Title", configValue: "title", type: FormControlType.Textbox } ] },
            { controls: [{ label: "Content alignment", configValue: "content_alignment", type: FormControlType.Dropdown, items: contentAlignments } ] },
            {
                label: "Info entities",
                controls: [{ type: FormControlType.Filler }],
                buttons: [
                    {
                        icon: "mdi:plus",
                        label: "Add info entity",
                        action: () => {
                            this._config.info_entities = [...this._config.info_entities, { entity: "" }];
                            this.requestUpdate();
                        }
                    }
                ]
            },
        ];

        this._config.info_entities?.forEach((entity: RoomCardEntity, index: number) => {
            //const entityAttributes = this._hass.states[entity.entity]?.attributes;
            //const options = getDropdownOptionsFromEnum(entityAttributes);

            formRows.push({ controls: [{ label: `Entity ${index + 1}`, configValue: `info_entities[${index}].entity`, value: entity.entity, type: FormControlType.EntityDropdown }] });
            // formRows.push({
            //     cssClass: "side-by-side",
            //     controls: [                    
            //         { label: "Attribute", configValue: `info_entities[${index}].attribute`, value: entity.attribute, type: FormControlType.Dropdown, items: options },
            //         { label: "Show icon", configValue: `info_entities[${index}].show_icon`, value: entity.show_icon?.toString(), type: FormControlType.Switch },
            //         { label: "Icon", configValue: `info_entities[${index}].icon`, value: entity.icon as string, type: FormControlType.Textbox }
            //     ]
            // })

        });


        return this.renderForm(formRows);
    }
}