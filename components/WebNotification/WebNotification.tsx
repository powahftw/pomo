import { useEffect } from 'react';
import usePrevious from '../../hooks/usePrevious';
import { useAppState } from '../../providers/app-state-context';
import { usePreference } from '../../providers/preference-context';
import { Stage } from '../../types/enum';
import { didTimerRecentlyFinish } from '../../utils/state_utils';

export default function WebNotification() {
  const { appState } = useAppState();
  const prevState = usePrevious(appState);

  const {
    state: { 'browser-notifications': enableNotification },
  } = usePreference();

  const notificationSettings = {
    icon: 'favicon.ico',
    body: `Completed ${appState.workCycleCompleted} sessions.\nTime to ${
      appState.stage === Stage.WORK ? 'rest' : 'work'
    }!`,
  };

  useEffect(() => {
    if (enableNotification && didTimerRecentlyFinish(prevState, appState)) {
      new Notification('Session Completed!', notificationSettings);
    }
  }, [appState.timerState]);

  return null;
}
