import { Popover } from '@headlessui/react';
import { useEffect } from 'react';
import { Info, Link } from 'react-feather';
import { useAppState } from '../../providers/app-state-context';
import { ActionType, Stage } from '../../types/enum';
import { nextActionType } from '../../utils/state_utils';
import { useFloating, offset, shift } from '@floating-ui/react-dom';

export default function Footer() {
  const { appState, dispatch } = useAppState();
  const { x, y, reference, floating, strategy } = useFloating({
    placement: 'top-end',
    middleware: [offset(10), shift({ padding: 5 })],
  });

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
          <Popover.Button ref={reference}>
            <Info
              className="transition-colors duration-500 ease-in-out group-hover:animate-hop stroke-hc-color group-hover:stroke-hc-color-accent"
              size={32}
            />
          </Popover.Button>
          <Popover.Panel
            ref={floating}
            style={{
              position: strategy,
              top: y ?? '',
              left: x ?? '',
            }}
            className="z-10 w-96"
          >
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="flex flex-col gap-2 bg-white p-4">
                <p className="leading-5">
                  The Pomodoro Technique is a time management method. It uses a
                  timer to break work into intervals, traditionally 25 minutes
                  in length, separated by short breaks.{' '}
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
        </Popover>
      </div>
    </div>
  );
}

const KeyBindingRow = ({ keybindings, label }) => (
  <p>
    {keybindings.map((keybinding, idx) => (
      <span key={keybinding}>
        {idx > 0 && ' / '}
        <kbd className="inline-block border-[1px] border-solid border-black rounded-[4px] p-[0.2em] shadow-inner bg-gray-100">
          {keybinding}
        </kbd>
      </span>
    ))}
    <label className="ml-4">{label}</label>
  </p>
);
