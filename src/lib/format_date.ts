// Source: https://github.com/home-assistant/frontend/blob/dev/src/common/datetime/format_date.ts

import { FrontendLocaleData } from 'custom-card-helpers';
import memoizeOne from 'memoize-one';

export const formatDate = (dateObj: Date, locale: FrontendLocaleData) => formatDateMem(locale).format(dateObj);

const formatDateMem = memoizeOne(
    (locale) =>
        new Intl.DateTimeFormat(locale.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
);
