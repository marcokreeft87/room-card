import { DropdownOption, FormControlRow, FormControlTab, FormControlType } from "@marcokreeft/ha-editor-formbuilder/dist/interfaces";
import { HomeAssistant } from "custom-card-helpers";
import { ConditionOption, EntityCondition, RoomCardAlignment, RoomCardConfig, RoomCardEntity, RoomCardIcon } from "../types/room-card-types";
import { getDropdownOptionsFromEnum } from "@marcokreeft/ha-editor-formbuilder/dist/utils/entities";

export const renderEntityTabs = (config: RoomCardConfig, hass: HomeAssistant) => {
    const entityTabs: FormControlTab[] = [];
    config.entities?.forEach((entity: RoomCardEntity, index: number) => {
        const entityAttributes = hass.states[entity.entity]?.attributes;
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
                    { label: "Attribute", configValue: `entities[${index}].attribute`, value: entity.attribute, type: FormControlType.Dropdown, hidden: entity.show_icon, items: options },                    
                ]
            },
            renderIconConditions(entity, options, index),
            ]
        });

    });
    
    
    return entityTabs;
}

export const renderIconConditions = (entity: RoomCardEntity, entityAttributes: DropdownOption[], index: number) : FormControlRow => {
    const conditionTypeOptions = getDropdownOptionsFromEnum(ConditionOption);
    
    const row: FormControlRow = {
        cssClass: "form-control-attributes",
        tabs: []
    };

    ((entity.icon as RoomCardIcon)?.conditions ?? []).map((condition: EntityCondition, conditionIndex) => {

        row.tabs.push({
            label: `Condition ${conditionIndex + 1}`,
            rows: [{
                cssClass: "side-by-side",
                controls: [
                    { label: 'Attribute', configValue: `entities[${index}].icon.conditions[${conditionIndex}].attribute`, value: condition.attribute, type: FormControlType.Dropdown, items: entityAttributes },
                    { label: 'Condition', configValue: `entities[${index}].icon.conditions[${conditionIndex}].condition`, value: condition.condition, type: FormControlType.Dropdown, items: conditionTypeOptions },
                    { label: 'Value', configValue: `entities[${index}].icon.conditions[${conditionIndex}].value`, value: condition.value.toString(), type: FormControlType.Textbox },
                    // { label: `Condition ${conditionIndex + 1}`, configValue: `entities[${index}].icon.conditions[${conditionIndex}].condition`, value: condition.condition, type: FormControlType.Dropdown, items: conditionOptions },
                    // { label: "Type", configValue: `entities[${index}].icon.conditions[${conditionIndex}].type`, value: condition., type: FormControlType.Dropdown, items: conditionTypeOptions },
                    // { label: "Value", configValue: `entities[${index}].icon.conditions[${conditionIndex}].value`, value: condition.value, type: FormControlType.Textbox }
                ]
            }]
        });
    });

    return row;

    // (entity.icon as RoomCardIcon)?.conditions?.map((condition: EntityCondition, conditionIndex) => {

        

        

    //     return row;

    //     entityTabs[index].rows.push({
    //         cssClass: "side-by-side",
    //         controls: [
    //             { label: `Condition ${conditionIndex + 1}`, configValue: `entities[${index}].icon.conditions[${conditionIndex}].condition`, value: condition.condition, type: FormControlType.Dropdown, items: conditionOptions },
    //             { label: "Type", configValue: `entities[${index}].icon.conditions[${conditionIndex}].type`, value: condition.type, type: FormControlType.Dropdown, items: conditionTypeOptions },
    //             { label: "Value", configValue: `entities[${index}].icon.conditions[${conditionIndex}].value`, value: condition.value, type: FormControlType.Textbox }
    //         ]
    //     });
    // });

    return null;
}

export const renderInfoEntityTabs = (config: RoomCardConfig, hass: HomeAssistant) : FormControlTab[] => {
    const entityTabs: FormControlTab[] = [];
    config.info_entities?.forEach((entity: RoomCardEntity, index: number) => {
        const entityAttributes = hass.states[entity.entity]?.attributes;
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

    return entityTabs;
}

export const renderMainEntity = (config: RoomCardConfig) : FormControlRow[] => {
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
                { hidden: config.show_icon, label: "Icon", configValue: "icon", value: config.icon.toString(), type: FormControlType.Icon } ,
                { label: "Hide title", configValue: "hide_title", type: FormControlType.Switch },
                { hidden: config.hide_title, label: "Title", configValue: "title", type: FormControlType.Textbox }
            ]
        },
        { controls: [{ label: "Content alignment", configValue: "content_alignment", type: FormControlType.Dropdown, items: contentAlignments } ] }
    ];
}