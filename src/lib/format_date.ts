// Source: https://github.com/home-assistant/frontend/blob/dev/src/common/datetime/format_date.ts

import { FrontendLocaleData } from 'custom-card-helpers';

export const formatDate = (dateObj: Date, locale: FrontendLocaleData) => new Intl.DateTimeFormat(locale.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
}).format(dateObj);
