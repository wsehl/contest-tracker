import dayjs from "dayjs";
import relativeTimePlugin from "dayjs/plugin/relativeTime";
import locale_ru from "dayjs/locale/ru";

dayjs.locale(locale_ru);

dayjs.extend(relativeTimePlugin);

export default dayjs;
