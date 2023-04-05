import { createContext, useReducer } from "react";
import { initialAppState, appReducer } from "./app.state";

export const AppContext = createContext<any>(null);

interface ProviderProps {
  children: any;
}

export const Provider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  const value = {
    dispatch,
    ...state,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
