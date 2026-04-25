import { Lang } from "@/types";

function getLocale(lang: Lang) {
  switch (lang) {
    case 'km': return 'km-KH';
    case 'en': return 'en-US';
  }
}

export function localDate(utc: string, lang: Lang) {
  const locale = getLocale(lang);
  const date = new Date(utc);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString(locale, { month: 'long' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}
