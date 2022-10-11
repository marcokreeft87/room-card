import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { HideIfConfig, RoomCardEntity, RoomCardRow } from "./types/room-card-types";
import { checkConditionalValue, isUnavailable } from "./util";

export const hideUnavailable = (entity: RoomCardEntity) : boolean =>
    entity.hide_unavailable && isUnavailable(entity.stateObj);

export const hideIfCard = (cardConfig: LovelaceCardConfig, hass: HomeAssistant) => {
    if (cardConfig.hide_if === undefined) {
        return false;
    }

    if (<HideIfConfig>cardConfig.hide_if)
    {        
        const entityValue = hass.states[cardConfig.entity]?.state;
        const matchedConditions = (cardConfig.hide_if as HideIfConfig).conditions?.filter(item => {
    
            let checkEntityValue = entityValue;
            if(item.entity) {                
                const stateEntity = hass.states[item.entity];
                checkEntityValue = item.attribute ? stateEntity.attributes[item.attribute] : stateEntity.state;
            }

            if(item.attribute && !item.entity) {                
                checkEntityValue = hass.states[cardConfig.entity].attributes[item.attribute];
            }
    
            return checkConditionalValue(item, checkEntityValue);
        });
        
        return matchedConditions?.length > 0;    
    }
};

export const hideIfRow = (row: RoomCardRow, hass: HomeAssistant) => {
    if (row.hide_if === undefined) {
        return false;
    }

    if (<HideIfConfig>row.hide_if)
    {
        const matchedConditions = (row.hide_if as HideIfConfig).conditions?.filter(item => {
    
            if(item.entity) {                
                const stateEntity = hass.states[item.entity];

                return checkConditionalValue(item, item.attribute ? stateEntity.attributes[item.attribute] : stateEntity.state);
            }
        });
        
        return matchedConditions?.length > 0;        
    }
};

export const hideIfEntity = (entity: RoomCardEntity, hass: HomeAssistant) => {
    if (hideUnavailable(entity)) {
        return true;
    }
    if (entity.hide_if === undefined) {
        return false;
    }

    if (<HideIfConfig>entity.hide_if)
    {
        const entityValue = entity.stateObj.state;
        const matchedConditions = (entity.hide_if as HideIfConfig).conditions?.filter(item => {
    
            let checkEntityValue = entityValue;
            if(item.entity) {                
                const stateEntity = hass.states[item.entity];
                checkEntityValue = item.attribute ? stateEntity.attributes[item.attribute] : stateEntity.state;
            }

            if(item.attribute && !item.entity) {                
                checkEntityValue = entity.stateObj.attributes[item.attribute];
            }
    
            return checkConditionalValue(item, checkEntityValue);
        });
        
        return matchedConditions?.length > 0;        
    }
};
