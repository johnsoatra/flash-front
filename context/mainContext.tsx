'use client';
import { createContext, useContext, useEffect, useState } from "react";
import useCurrent from "react-use-current";

export type MainContextType = {
  lastCardCode?: string;
};

const MainContext = createContext<{ value: MainContextType } | null>(null);

export function MainContextProvider({
  children
}: {
  children: React.ReactNode
}) {
  const { value: context } = useCurrent<MainContextType>({
    lastCardCode: undefined,
  });
  const [state, setState] = useState<{ value: MainContextType }>({
    value: context,
  });

  function setNew() {
    console.log('herer');
    return {}
  }

  useEffect(() => {
    setTimeout(() => {
      context.lastCardCode = Date.now().toString()
    }, 2000);
  })

  useEffect(() => {
    setState({ value: context });
  }, [context.lastCardCode]);

  console.log('changed');
  const a = {test: Date.now()}


  return (
    <MainContext.Provider value={a}>
      {children}
    </MainContext.Provider>
  );
}

export function useMainContext() {
  console.log('sdfsdf');
  const context = useContext(MainContext);
  if (!context) throw new Error("useUser must be inside MainProvider");
  return context;
}
