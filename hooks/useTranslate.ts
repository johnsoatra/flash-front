import { useMainContext } from "@/context/mainContext";
import km from "@/lang/km";
import en from "@/lang/en";
import { useCallback } from "react";

const Translation = {
  km,
  en,
} as const;

export default function useTranslate() {
  const { lang } = useMainContext();
  const translate = useCallback(
    function <T extends keyof typeof km>(key: T) {
      return Translation[lang][key];
    },
    [lang],
  );
  return translate;
}
