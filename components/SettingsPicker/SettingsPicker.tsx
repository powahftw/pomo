import { Settings } from 'react-feather';
import React, { useEffect, useState, Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { usePreference } from '../../providers/preference-context';
import { Theme } from '../../types/themes';
import { ActionType, PreferenceKeys } from '../../store/preference';
import { keysOf } from '../../utils/object_utils';

export default function SettingsPicker() {
  const {
    state: { 'color-theme': currTheme, ...settingsPickerPreferences },
    dispatch,
  } = usePreference();

  const preferenceKeys = keysOf(settingsPickerPreferences);
  const preferenceValues = Object.values(settingsPickerPreferences);

  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    const initiallyCheckedIDS = Object.entries(settingsPickerPreferences)
      .filter(([, v]) => v)
      .map(([k]) => k);
    setCheckedItems(initiallyCheckedIDS);
  }, [...preferenceValues]);

  const handleCheckBoxToggle = (id) => {
    const wasCheckboxPreviouslyChecked = checkedItems.includes(id);
    // Add or remove the ID based on if it was previously already selected.
    const newCheckedCheckboxes = wasCheckboxPreviouslyChecked
      ? [...checkedItems.filter((it) => it !== id)]
      : [...checkedItems, id];
    const newPreferences = preferenceKeys.reduce(
      (o, k) => ({ ...o, [k]: newCheckedCheckboxes.includes(k) }),
      {}
    );
    setCheckedItems(newCheckedCheckboxes);
    dispatch({
      type: ActionType.UPDATE_PREFERENCE,
      newPreferences,
    });
  };

  const SPACEBAR_KEY = ' ';
  const handleCheckBoxToggleOnSpacebar = (
    e: React.KeyboardEvent<HTMLDivElement>,
    id: string
  ) => {
    if (e.key === SPACEBAR_KEY) {
      handleCheckBoxToggle(id);
    }
  };

  const settingsIdToLabel = new Map<PreferenceKeys, string>([
    ['auto-switch', 'Auto Switch'],
    ['enable-sounds', 'Enable Sounds'],
  ]);

  return (
    <Popover className="relative">
      <Popover.Button>
        <Settings color={currTheme === Theme.LIGHT ? 'black' : 'white'} />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 w-60 px-2 mt-3 transform sm:px-0 -right-2.5">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="flex flex-col gap-2 bg-white p-4">
              {keysOf(settingsPickerPreferences).map((value, idx) => (
                <div
                  key={value}
                  role="checkbox"
                  tabIndex={idx}
                  aria-checked={checkedItems.includes(value)}
                  onKeyDown={(e) => handleCheckBoxToggleOnSpacebar(e, value)}
                  onClick={() => handleCheckBoxToggle(value)}
                  className="flex select-none flex-row items-center justify-between p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                >
                  <span className="ml-2">{settingsIdToLabel.get(value)}</span>
                  <input
                    type="checkbox"
                    readOnly
                    tabIndex={-1}
                    checked={checkedItems.includes(value)}
                  />
                </div>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
