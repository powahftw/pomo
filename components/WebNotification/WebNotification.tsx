import { useEffect } from 'react';
import usePrevious from '../../hooks/usePrevious';
import { usePreference } from '../../providers/preference-context';
import { Stage } from '../../types/enum';
import { didTimerRecentlyFinish } from '../../utils/state_utils';

export default function WebNotification({ state }) {
  const prevState = usePrevious(state);
  const {
    state: { 'browser-notifications': enableNotification },
  } = usePreference();

  const notificationSettings = {
    icon: 'favicon.ico',
    body: `Completed ${state.workCycleCompleted} sessions.\nTime to ${
      state.stage === Stage.WORK ? 'rest' : 'work'
    }!`,
  };

  useEffect(() => {
    if (enableNotification && didTimerRecentlyFinish(prevState, state)) {
      new Notification('Session Completed!', notificationSettings);
    }
  }, [state.timerState]);

  return null;
}
