import Cookie from 'js-cookie';
import Config from '@/constants/config';
import { Label } from '@/constants';
import { Lang } from "@/types";
import { isClient } from "../window";

export function validateLang(lang: string): Lang {
  if (lang === 'en' || lang === 'km') {
    return lang;
  }
  return 'km';
}

export function getLang(): Lang {
  let lang: string | undefined;
  if (isClient()) {
    lang = Cookie.get(Label.Lang);
  }
  return lang ? validateLang(lang) : 'km';
}

export async function setLang(lang: Lang) {
  if (isClient()) {
    Cookie.set(Label.Lang, lang, {
      expires: Config.ExpiredLangIn,
    });
  }
}
