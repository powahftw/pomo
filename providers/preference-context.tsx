import { createContext, useReducer, useEffect, useContext } from 'react';
import {
  DEFAULT_PREFERENCE,
  preferenceReducer,
  PREFERENCE_LS_KEY,
  State,
  Action,
  ActionType,
} from '../store/preference';

type Dispatch = (action: Action) => void;
const PreferenceContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function PreferenceProvider({ children }) {
  const [state, dispatch] = useReducer(preferenceReducer, DEFAULT_PREFERENCE);

  // Load previously stored preferences from localStorage and update the reducer state.
  useEffect(() => {
    const previouslySavedPreferences = JSON.parse(
      localStorage.getItem(PREFERENCE_LS_KEY)
    );
    dispatch({
      type: ActionType.UPDATE_PREFERENCE,
      newPreferences: previouslySavedPreferences,
    });
  }, []);

  // Update localStorage to contain the reducer state after it is updated.
  useEffect(() => {
    localStorage.setItem(PREFERENCE_LS_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <PreferenceContext.Provider value={{ state, dispatch }}>
      {children}
    </PreferenceContext.Provider>
  );
}

function usePreference() {
  const context = useContext(PreferenceContext);
  if (context === undefined) {
    throw new Error('usePreference must be used within a PreferenceProvider');
  }
  return context;
}

export { PreferenceProvider, usePreference };
