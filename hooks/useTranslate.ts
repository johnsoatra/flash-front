import { useMainContext } from "@/context/mainContext";
import kh from "@/lang/kh";
import en from "@/lang/en";
import { useCallback } from "react";

const Translation = {
  kh,
  en,
} as const;

export default function useTranslate() {
  const { lang } = useMainContext();
  const translate = useCallback(
    function <T extends keyof typeof kh>(key: T) {
      return Translation[lang][key];
    },
    [lang],
  );
  return translate;
}
