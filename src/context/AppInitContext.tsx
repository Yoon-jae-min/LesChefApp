import React, { createContext, useContext } from 'react';

const AppInitContext = createContext<boolean>(false);

export function AppInitProvider({
  isAppInitialized,
  children,
}: {
  isAppInitialized: boolean;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <AppInitContext.Provider value={isAppInitialized}>{children}</AppInitContext.Provider>
  );
}

export function useAppInitialized(): boolean {
  return useContext(AppInitContext);
}
