export const style = (css) => css`
    ha-card .card-header {
        padding-bottom: 0px;
    }
    .icon-small {
        display: inline-block;
    }
    .entity {
        text-align: center;
        cursor: pointer;
    }
    .entity span {
        font-size: 10px;
    }
    .entities-row {
        flex-direction: row;
        flex-wrap: wrap;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px 10px 20px;
    }
    .entities-row .entity {
        margin-right: 16px;
    }    
    .entities-row .entity:last-of-type,
    .entities-info-row .entity:last-of-type {
        margin-right: 0;
    }
    .entities-column {
        flex-direction: column;
        display: flex;
        align-items: flex-end;
        justify-content: space-evenly;
    }
    .entities-column .entity div {
        display: inline-block;
        vertical-align: middle;
    }

    .entities-info-row {
        flex-direction: row;
        flex-wrap: wrap;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px 10px 20px;
        font-size: 12px;
        position: absolute;
        right: 20px;
        top: 15px;
    }
    .entities-info-row .entity {
        margin-right: 16px;
    }
    .entities-info-row .entity.icon-entity {
        margin-right: 0px;
    }
    .main-state {
        float: left;
        margin-right: 10px;
    }
    .main-state > ha-state-icon > ha-svg-icon {
        vertical-align: baseline;
    }
    .main-icon {
        vertical-align: baseline;
        font-size: 30px;
    }
`;
