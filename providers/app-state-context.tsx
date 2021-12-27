import { createContext, useReducer, useContext } from 'react';
import {
  DEFAULT_APP_STATE,
  AppState,
  Action,
  appStateReducer,
} from '../store/timer';

type Dispatch = (action: Action) => void;
const AppStateContext = createContext<
  { appState: AppState; dispatch: Dispatch } | undefined
>(undefined);

function AppStateProvider({ children }) {
  const [appState, dispatch] = useReducer(appStateReducer, DEFAULT_APP_STATE);

  return (
    <AppStateContext.Provider value={{ appState, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppStateProvider');
  }
  return context;
}

export { AppStateProvider, useAppState };
