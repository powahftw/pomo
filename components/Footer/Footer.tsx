import { Popover, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { Info, Link } from 'react-feather';
import { useAppState } from '../../providers/app-state-context';
import { ActionType, Stage } from '../../types/enum';
import { nextActionType } from '../../utils/state_utils';

export default function Footer() {
  const { appState, dispatch } = useAppState();

  const keyHandler = ({ target, key }) => {
    // Prevent keyboard shortcuts to work while the user is focusing an input element.
    // eg: the task input field.
    if (target.matches('input')) {
      return;
    }
    switch (key) {
      case '1': {
        dispatch({ type: ActionType.CHANGE_STAGE, transitionTo: Stage.WORK });
        break;
      }
      case '2': {
        dispatch({
          type: ActionType.CHANGE_STAGE,
          transitionTo: Stage.SHORT_REST,
        });
        break;
      }
      case '3': {
        dispatch({
          type: ActionType.CHANGE_STAGE,
          transitionTo: Stage.LONG_REST,
        });
        break;
      }
      case 'q': {
        dispatch({
          type: nextActionType(appState),
        });
        break;
      }
      case 'w': {
        dispatch({
          type: ActionType.STOP,
        });
        break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('keydown', keyHandler);
    };
  }, [appState]);

  return (
    <div className="z-10 flex flex-row self-stretch justify-end pb-6 px-6 leading-none">
      <div className="group">
        <Popover className="relative">
          <Popover.Button>
            <Info
              className="transition-colors duration-500 ease-in-out group-hover:animate-hop stroke-hc-color group-hover:stroke-hc-color-accent"
              size={28}
            />
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
            <Popover.Panel className="absolute z-10 w-96 px-2 -top-[250px] transform sm:px-0 -right-2.5">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="flex flex-col gap-2 bg-white p-4">
                  <p className="leading-5">
                    The Pomodoro Technique is a time management method. It uses
                    a timer to break work into intervals, traditionally 25
                    minutes in length, separated by short breaks.{' '}
                    <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">
                      <Link className="inline-block" color="blue" size={12} />
                    </a>
                  </p>
                  <span className="text-xl">KeyBinding</span>
                  <KeyBindingRow
                    keybindings={['1', '2', '3']}
                    label={'To switch between states'}
                  />
                  <KeyBindingRow
                    keybindings={['Q']}
                    label={'To Pause / Resume'}
                  />
                  <KeyBindingRow keybindings={['W']} label={'To Stop'} />
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </div>
  );
}

const KeyBindingRow = ({ keybindings, label }) => (
  <p>
    {keybindings.map((keybinding, idx) => (
      <>
        {idx > 0 && ' / '}
        <kbd
          key={keybinding}
          className="inline-block border-[1px] border-solid border-black rounded-[4px] p-[0.2em] shadow-inner bg-gray-100"
        >
          {keybinding}
        </kbd>
      </>
    ))}
    <label className="ml-4">{label}</label>
  </p>
);
