import { useEffect, useReducer, useRef } from 'react';
import Head from 'next/head';
import { StopCircle } from 'react-feather';
import PillButton from '../components/PillButton';
import TimerDisplay from '../components/TimerDisplay';
import { Stage, TimerState, ActionType } from '../types/enum';
import PauseOrPlayButton from '../components/PauseOrPlayButton';
import StatsDisplay from '../components/StatsDisplay';
import CircleAnimation from '../components/CircleAnimation';
import {
  DEFAULT_STATE,
  LONG_BREAK_EVERY_N_SESSION,
  reducer,
  stageToTime,
} from '../store/timer';
import usePrevious from '../hooks/usePrevious';
import TabButton from '../components/TabButton';
import { didTimerRecentlyFinish } from '../utils/state_utils';
import Navbar from '../components/Navbar';
import { usePreference } from '../providers/preference-context';

export default function Home() {
  const [state, dispatchTimer] = useReducer(reducer, DEFAULT_STATE);
  const prevState = usePrevious(state);
  const intervalRef = useRef(0);

  const {
    state: { 'auto-switch': shouldAutoSwitch },
  } = usePreference();

  const transitionStage = (transitionTo: Stage) => {
    dispatchTimer({ type: ActionType.CHANGE_STAGE, transitionTo });
  };

  // Handles creating timer on play
  useEffect(() => {
    if (state.timerState === TimerState.PLAYING) {
      intervalRef.current = window.setInterval(
        () => dispatchTimer({ type: ActionType.TICK }),
        1000
      );
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [state.timerState]);

  // On PLAYING -> PAUSED transition we can automatically switch the user to the following state.
  useEffect(() => {
    if (didTimerRecentlyFinish(prevState, state) && shouldAutoSwitch) {
      const breakState =
        state.workCycleCompleted % LONG_BREAK_EVERY_N_SESSION === 0
          ? Stage.LONG_REST
          : Stage.SHORT_REST;
      const transitionTo = state.stage !== Stage.WORK ? Stage.WORK : breakState;
      transitionStage(transitionTo);
      dispatchTimer({ type: ActionType.PLAY });
    }
  }, [state.timerState]);

  const isPlaying = () => state.timerState === TimerState.PLAYING;

  return (
    <>
      <Head>
        <title>Pomo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-col items-center justify-center grow -mt-16">
          <main className="font-mono flex flex-col items-center gap-16">
            <h1 className="text-4xl text-blue-500">
              A simple Pomodoro timer app.
            </h1>
            <div className="flex flex-row rounded-full border-b-4 border-blue-500 overflow-hidden">
              <TabButton
                text="Work"
                active={state.stage === Stage.WORK}
                onClickAction={() => transitionStage(Stage.WORK)}
              />
              <TabButton
                text="Short Pause"
                active={state.stage === Stage.SHORT_REST}
                onClickAction={() => transitionStage(Stage.SHORT_REST)}
              />
              {LONG_BREAK_EVERY_N_SESSION > 0 && (
                <TabButton
                  text="Long Pause"
                  active={state.stage === Stage.LONG_REST}
                  onClickAction={() => transitionStage(Stage.LONG_REST)}
                />
              )}
            </div>
            <CircleAnimation
              currStage={state.timerState}
              timeLeft={state.timeLeft}
              totalTime={stageToTime.get(state.stage)}
            >
              <TimerDisplay
                secondsLeft={state.timeLeft}
                currStage={state.stage}
              />
            </CircleAnimation>
            <div className="flex flex-row gap-8">
              <PauseOrPlayButton
                isPlaying={isPlaying()}
                wasActiveBefore={state.everStarted}
                onPlayAction={() => dispatchTimer({ type: ActionType.PLAY })}
                onPauseAction={() => dispatchTimer({ type: ActionType.PAUSE })}
              />
              <PillButton
                text="Stop"
                icon={<StopCircle strokeWidth={1.5} size={24} />}
                onClickAction={() => dispatchTimer({ type: ActionType.STOP })}
              />
              <StatsDisplay sessionCompleted={state.workCycleCompleted} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
