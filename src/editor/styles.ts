import { css } from 'lit';

export const style = css`
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
