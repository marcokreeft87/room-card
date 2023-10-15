import EditorForm from "@marcokreeft/ha-editor-formbuilder";
import { FormControlType } from "@marcokreeft/ha-editor-formbuilder/dist/interfaces";
import { getDropdownOptionsFromEnum } from "@marcokreeft/ha-editor-formbuilder/dist/utils/entities";
import { TemplateResult, html } from "lit";
import { CARD_EDITOR_NAME } from "./consts";
import { customElement } from "lit/decorators.js";
import { RoomCardAlignment } from "./types/room-card-types";

@customElement(CARD_EDITOR_NAME)
export class RoomcardEditor extends EditorForm {

    protected render(): TemplateResult {
        if (!this._hass || !this._config) {
            return html``;
        }

        const contentAlignments = getDropdownOptionsFromEnum(RoomCardAlignment);
        return this.renderForm([
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
                controls: this._config.info_entities?.map((entity: string, index: number) => {
                    return { 
                        label: `Entity ${index + 1}`, 
                        configValue: `info_entities.${index}`, 
                        type: FormControlType.EntityDropdown 
                    }
                }) ?? []
            }
        ]);
    }
}