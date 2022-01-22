import { useEffect, useRef } from 'react';
import Head from 'next/head';
import { StopCircle } from 'react-feather';
import PillButton from '../components/PillButton';
import TimerDisplay from '../components/TimerDisplay';
import { Stage, TimerState, ActionType } from '../types/enum';
import PauseOrPlayButton from '../components/PauseOrPlayButton';
import StatsDisplay from '../components/StatsDisplay';
import CircleAnimation from '../components/CircleAnimation';
import usePrevious from '../hooks/usePrevious';
import TabButton from '../components/TabButton';
import { didTimerRecentlyFinish } from '../utils/state_utils';
import Navbar from '../components/Navbar';
import { usePreference } from '../providers/preference-context';
import WebNotification from '../components/WebNotification';
import { useAppState } from '../providers/app-state-context';
import TabGlider from '../components/TabGlider';
import Footer from '../components/Footer';
import Tasks from '../components/Tasks';

export default function Home() {
  const { appState, dispatch } = useAppState();
  const prevState = usePrevious(appState);
  const intervalRef = useRef(0);

  const {
    state: {
      'auto-switch': shouldAutoSwitch,
      'long-pause-every-n-sessions': longPauseEveryNSessions,
      'timer-preference': timerPreference,
    },
  } = usePreference();

  const transitionStage = (transitionTo: Stage) => {
    dispatch({ type: ActionType.CHANGE_STAGE, transitionTo });
  };

  // Handles creating timer on play
  useEffect(() => {
    if (appState.timerState === TimerState.PLAYING) {
      intervalRef.current = window.setInterval(
        () => dispatch({ type: ActionType.TICK }),
        1000
      );
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [appState.timerState]);

  useEffect(() => {
    dispatch({
      type: ActionType.CHANGE_TIMER_SETTINGS,
      newTimerSettings: {
        [Stage.WORK]: timerPreference['work'],
        [Stage.LONG_REST]: timerPreference['long-rest'],
        [Stage.SHORT_REST]: timerPreference['short-rest'],
      },
    });
  }, [timerPreference]);

  // On PLAYING -> PAUSED transition we can automatically switch the user to the following state.
  useEffect(() => {
    if (didTimerRecentlyFinish(prevState, appState) && shouldAutoSwitch) {
      const breakState =
        appState.cycleCompleted[Stage.WORK] % longPauseEveryNSessions === 0
          ? Stage.LONG_REST
          : Stage.SHORT_REST;
      const transitionTo =
        appState.stage !== Stage.WORK ? Stage.WORK : breakState;
      transitionStage(transitionTo);
      dispatch({ type: ActionType.PLAY });
    }
  }, [appState.timerState]);

  const isPlaying = () => appState.timerState === TimerState.PLAYING;
  const activeStageMapping = new Map<Stage, number>([
    [Stage.WORK, 0],
    [Stage.SHORT_REST, 1],
    [Stage.LONG_REST, 2],
  ]);

  return (
    <>
      <Head>
        <title>Pomo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col bg-bg-color transition ease-in-out duration-300">
        <Navbar />
        <Tasks />
        <div className="flex flex-col items-center justify-center grow -mt-16">
          <main className="font-mono flex flex-col items-center gap-16">
            <div className="bg-el-bg-color flex flex-row rounded-full border-b-4 border-main-color overflow-hidden relative px-2 py-4">
              <TabButton
                text="Work"
                active={appState.stage === Stage.WORK}
                onClickAction={() => transitionStage(Stage.WORK)}
              />
              <TabButton
                text="Short Pause"
                active={appState.stage === Stage.SHORT_REST}
                onClickAction={() => transitionStage(Stage.SHORT_REST)}
              />
              {longPauseEveryNSessions > 0 && (
                <TabButton
                  text="Long Pause"
                  active={appState.stage === Stage.LONG_REST}
                  onClickAction={() => transitionStage(Stage.LONG_REST)}
                />
              )}
              <TabGlider activeTab={activeStageMapping.get(appState.stage)} />
            </div>
            <CircleAnimation
              currStage={appState.stage}
              timeLeft={appState.timeLeft}
              totalTime={appState.timerSettings[appState.stage]}
            >
              <TimerDisplay />
            </CircleAnimation>
            <div className="flex flex-row gap-8">
              <PauseOrPlayButton
                isPlaying={isPlaying()}
                isTimeOver={appState.timeLeft == 0}
                wasActiveBefore={appState.everStarted}
                onPlayAction={() => dispatch({ type: ActionType.PLAY })}
                onPauseAction={() => dispatch({ type: ActionType.PAUSE })}
                onRestartAction={() => dispatch({ type: ActionType.RESTART })}
              />
              <PillButton
                text="Stop"
                icon={<StopCircle strokeWidth={1.5} size={24} />}
                onClickAction={() => dispatch({ type: ActionType.STOP })}
              />
            </div>
            <WebNotification />
          </main>
        </div>
        <Footer />
        <StatsDisplay cycleCompleted={appState.cycleCompleted} />
      </div>
    </>
  );
}
