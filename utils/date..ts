import { Lang } from "@/types";
import { isKhmer } from "./utils";

const KhmerMonth = [
  "មករា",
  "កុម្ភៈ",
  "មីនា",
  "មេសា",
  "ឧសភា",
  "មិថុនា",
  "កក្កដា",
  "សីហា",
  "កញ្ញា",
  "តុលា",
  "វិច្ឆិកា",
  "ធ្នូ",
];

export function localDate(utc: string, lang: Lang) {
  const date = new Date(utc);
  const day = date.getDate().toString().padStart(2, '0');
  const month = isKhmer(lang) ?
    KhmerMonth[date.getMonth()] :
    date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}
