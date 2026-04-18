'use client';
import { createContext, useContext } from "react";
import useCurrent, { useTrack } from "react-use-current";
import { getCards } from "@/utils/localStorage/cards";
import { getToken } from "@/utils/localStorage/token";
import { getChecked } from "@/utils/localStorage/checked";
import { GetConfigResponse } from "@/dto/getConfig";

export type MainContextType = {
  value: {
    token: string | null;
    cards: string[];
    checkedCard: boolean | null;
    openCards: boolean;
    openProcessing: boolean;
    config?: GetConfigResponse;
  }
};

const MainContext = createContext<MainContextType | null>(null);

export function MainContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { value: context } = useCurrent<MainContextType['value']>({
    token: getToken(),
    cards: getCards(),
    checkedCard: getChecked(),
    openCards: false,
    openProcessing: false,
  });
  const track = useTrack();

  return (
    <MainContext.Provider value={track({ value: context }) as MainContextType}>
      {children}
    </MainContext.Provider>
  );
}

export function useMainContext() {
  const context = useContext(MainContext)?.value;
  if (!context) throw new Error("useUser must be inside MainProvider");
  return context;
}
