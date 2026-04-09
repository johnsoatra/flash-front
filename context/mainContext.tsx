'use client';
import { createContext, useContext, useEffect, useRef } from "react";
import useCurrent, { useTrack } from "react-use-current";
import { getCardId, removeCardId, setCardId } from "@/utils/localStorage/card-id";

export type MainContextType = {
  lastCardCode?: string | null;
};

const MainContext = createContext<{ value: MainContextType } | null>(null);

function useMainContextValue(context: MainContextType) {
  const ref = useRef({ value: context });
  ref.current = { value: context };
  return ref.current;
}

export function MainContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { value: context } = useCurrent<MainContextType>({});
  const contextValue = useMainContextValue(context);
  const track = useTrack();

  useEffect(() => {
    context.lastCardCode = getCardId();
  }, []);
  useEffect(() => {
    if (context.lastCardCode !== undefined) {
      if (context.lastCardCode !== null) {
        setCardId(context.lastCardCode);
      } else {
        removeCardId();
      }
    }
  }, [track(context.lastCardCode)]);

  return (
    <MainContext.Provider value={contextValue}>
      {children}
    </MainContext.Provider>
  );
}

export function useMainContext() {
  const context = useContext(MainContext)?.value;
  if (!context) throw new Error("useUser must be inside MainProvider");
  return context;
}
