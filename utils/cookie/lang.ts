import { cookies } from "next/headers";
import Cookie from 'js-cookie';
import { Label } from '@/constants';
import { Lang } from "@/types";
import { isClient } from "../window";

function validateLang(lang: string): Lang {
  if (lang === 'en' || lang === 'kh') {
    return lang;
  }
  return 'kh';
}

export async function getLang() {
  let lang: string | undefined;
  if (isClient()) {
    lang = Cookie.get(Label.Lang);
  }
  lang = (await cookies()).get(Label.Lang)?.value;
  return lang ? validateLang(lang): 'kh';
}

export async function setLang(lang: Lang) {
  const expiredAt = Date.now() + 60 * 60 * 24 * 365;
  if (isClient()) {
    Cookie.set(Label.Lang, lang, {
      expires: expiredAt,
    });
    return;
  }
  (await cookies()).set(Label.Lang, lang, {
    expires: expiredAt,
  });
}
