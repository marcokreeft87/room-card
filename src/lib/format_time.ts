// Source: https://github.com/home-assistant/frontend/blob/dev/src/common/datetime/format_time.ts
import { FrontendLocaleData } from 'custom-card-helpers';
import { useAmPm } from './use_am_pm';

export const formatTime = (dateObj: Date, locale: FrontendLocaleData) => new Intl.DateTimeFormat(locale.language, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: useAmPm(locale),
}).format(dateObj);
