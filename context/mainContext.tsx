'use client';
import { createContext, useContext, useEffect, useRef } from "react";
import useCurrent, { useTrack } from "react-use-current";
import { getLastCardCode, removeLastCardCode, setLastCardCode } from "@/utils/localStorage";

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
    context.lastCardCode = getLastCardCode();
  }, []);
  useEffect(() => {
    if (context.lastCardCode !== undefined) {
      if (context.lastCardCode !== null) {
        setLastCardCode(context.lastCardCode);
      } else {
        removeLastCardCode();
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
