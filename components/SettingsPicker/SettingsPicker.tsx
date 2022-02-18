import React, { useEffect } from 'react';
import { usePreference } from '../../providers/preference-context';
import { ActionType, PreferenceKeys } from '../../store/preference';
import { keysOf } from '../../utils/object_utils';
import CounterInput from '../CounterInput';

export default function SettingsPicker() {
  const {
    state: {
      'color-theme': currTheme,
      'long-pause-every-n-sessions': longPauseEveryNSessions,
      'timer-preference': timerPreference,
      ...settingsPickerPreferences
    },
    dispatch,
  } = usePreference();

  const enableNotification = settingsPickerPreferences['browser-notifications'];

  useEffect(() => {
    if (enableNotification && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, [enableNotification]);

  const handleTimerUpdate = (key: string, value: number) => {
    dispatch({
      type: ActionType.UPDATE_PREFERENCE,
      newPreferences: {
        'timer-preference': { ...timerPreference, [key]: value },
      },
    });
  };

  const handleCounterPreferenceChange = (id: PreferenceKeys, val: number) => {
    dispatch({
      type: ActionType.UPDATE_PREFERENCE,
      newPreferences: {
        ...settingsPickerPreferences,
        [id]: val,
      },
    });
  };

  const handleCheckBoxToggle = (id: PreferenceKeys) => {
    const wasCheckboxPreviouslyChecked = settingsPickerPreferences[id] ?? false;
    dispatch({
      type: ActionType.UPDATE_PREFERENCE,
      newPreferences: {
        ...settingsPickerPreferences,
        [id]: !wasCheckboxPreviouslyChecked,
      },
    });
  };

  const SPACEBAR_KEY = ' ';
  const handleCheckBoxToggleOnSpacebar = (
    e: React.KeyboardEvent<HTMLDivElement>,
    id: PreferenceKeys
  ) => {
    if (e.key === SPACEBAR_KEY) {
      handleCheckBoxToggle(id);
    }
  };

  const settingsIdToLabel = new Map<PreferenceKeys, string>([
    ['auto-switch', 'Auto Switch'],
    ['enable-sounds', 'Enable Sounds'],
    ['browser-notifications', 'Browser Notification'],
  ]);

  const timerIdsToLabel = new Map<string, string>([
    ['work', 'Work'],
    ['short-rest', 'Short Rest'],
    ['long-rest', 'Long Rest'],
  ]);

  return (
    <div className="flex flex-col gap-2 p-4">
      {keysOf(settingsPickerPreferences).map((value) => (
        <div
          key={value}
          role="checkbox"
          tabIndex={0}
          aria-checked={settingsPickerPreferences[value] ?? false}
          onKeyDown={(e) => handleCheckBoxToggleOnSpacebar(e, value)}
          onClick={() => handleCheckBoxToggle(value)}
          className="flex select-none flex-row items-center justify-between p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-main-color focus-visible:ring-opacity-50"
        >
          <span className="text-gray-700 text-sm font-semibold">
            {settingsIdToLabel.get(value)}
          </span>
          <input
            type="checkbox"
            className="accent-main-color scale-125"
            readOnly
            tabIndex={-1}
            checked={settingsPickerPreferences[value] ?? false}
          />
        </div>
      ))}{' '}
      {keysOf(timerPreference).map((key) => (
        <div
          key={key}
          className="select-none py-2 pl-2 rounded-lg hover:bg-gray-100 focus:outline-none"
        >
          <CounterInput
            label={timerIdsToLabel.get(key)}
            suffix={'sec'}
            value={timerPreference[key]}
            onValChange={(val) => handleTimerUpdate(key, val)}
          />
        </div>
      ))}
      <div className="select-none py-2 pl-2 rounded-lg hover:bg-gray-100 focus:outline-none">
        <CounterInput
          label={'Long Rest'}
          suffix={'every #n'}
          value={longPauseEveryNSessions}
          onValChange={(val) =>
            handleCounterPreferenceChange('long-pause-every-n-sessions', val)
          }
          minValue={0}
          maxValue={10}
        />
      </div>
    </div>
  );
}
