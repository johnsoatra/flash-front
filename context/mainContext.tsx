'use client';
import { createContext, useContext } from "react";
import useCurrent, { useTrack } from "react-use-current";

export type MainContextType = {
  value: {
    tokenExisted?: true;
    lastCardId?: string | null;
    openLastCard?: boolean;
  }
};

const MainContext = createContext<MainContextType | null>(null);

export function MainContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { value: context } = useCurrent<MainContextType['value']>({});
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
