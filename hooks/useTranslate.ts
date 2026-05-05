import { useCallback } from "react";
import { useMainContext } from "@/context/mainContext";
import km from "@/lang/km";
import en from "@/lang/en";

const Translation = {
  km,
  en,
} as const;

export default function useTranslate() {
  const context = useMainContext();
  const translate = useCallback(
    function <T extends keyof typeof km>(key: T) {
      return Translation[context.lang][key] ?? key;
    },
    [context.lang],
  );
  return translate;
}
