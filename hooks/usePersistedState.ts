import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function usePersistedState<T>(
  initialValue: T,
  storageKey: string
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const persistedValue = localStorage.getItem(storageKey);
    if (persistedValue) {
      setValue(JSON.parse(persistedValue) as T);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(value));
  }, [storageKey, value]);

  return [value, setValue];
}

export default usePersistedState;
