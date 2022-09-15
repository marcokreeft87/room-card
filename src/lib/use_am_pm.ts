// Source: https://github.com/home-assistant/frontend/blob/dev/src/common/datetime/use_am_pm.ts
import { FrontendLocaleData } from 'custom-card-helpers';
import { TimeFormat } from './constants';

export const useAmPm = (locale: FrontendLocaleData) => {
    if (locale.time_format === TimeFormat.language || locale.time_format === TimeFormat.system) {
        const testLanguage = locale.time_format === TimeFormat.language ? locale.language : undefined;
        const test = new Date().toLocaleString(testLanguage);
        return test.includes('AM') || test.includes('PM');
    }

    return locale.time_format === TimeFormat.am_pm;
};