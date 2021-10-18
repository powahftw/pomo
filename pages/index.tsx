import Head from 'next/head';
import PillButton from '../components/PillButton';
import 'tailwindcss/tailwind.css';
import TimerDisplay from '../components/TimerDisplay';
import React, { useEffect, useState } from 'react';
import { Stage, State } from '../types/enum';
import PauseOrPlayButton from '../components/PauseOrPlayButton';
import StatsDisplay from '../components/StatsDisplay';

const DEFAULT_WORK_TIME = 0.2 * 60;
const DEFAULT_REST_TIME = 0.1 * 60;

const DEFAULT_STATE = State.STOPPED;
const DEFAULT_STAGE = Stage.WORK;

const stageToTime = new Map<Stage, number>([
  [Stage.WORK, DEFAULT_WORK_TIME],
  [Stage.REST, DEFAULT_REST_TIME],
]);

export default function Home() {
  const [currState, setState] = useState(DEFAULT_STATE);
  const [currStage, setStage] = useState(DEFAULT_STAGE);
  const [timeLeft, setTime] = useState(stageToTime.get(DEFAULT_STAGE));
  const [everStarted, setEverStarted] = useState(false);
  const [nSessions, setNSessions] = useState(0);

  const transitionStage = (transitionTo?: Stage) => {
    const newStage =
      transitionTo ?? (currStage === Stage.WORK ? Stage.REST : Stage.WORK);
    if (currStage === Stage.WORK) {
      setNSessions(nSessions + 1);
    }
    setStage(newStage);
    setTime(stageToTime.get(newStage));
  };

  const reset = () => {
    setState(DEFAULT_STATE);
    setTime(stageToTime.get(DEFAULT_STAGE));
    setStage(DEFAULT_STAGE);
    setEverStarted(false);
    setNSessions(0);
  };

  const tick = () => {
    if (currState !== State.PLAYING) {
      return;
    }
    if (timeLeft <= 0) {
      transitionStage();
      return;
    }
    setTime(timeLeft - 1);
  };

  useEffect(() => {
    const id = setInterval(() => tick(), 1000);
    return () => clearInterval(id);
  });

  const onPlay = () => {
    setEverStarted(true);
    if (currState === State.PLAYING) {
      return;
    }
    setState(State.PLAYING);
  };

  const onStop = () => {
    if (currState === State.STOPPED) {
      return;
    }
    reset();
  };

  const onPause = () => {
    if (currState === State.PAUSED) {
      return;
    }
    setState(State.PAUSED);
  };

  const isPlaying = () => currState === State.PLAYING;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-700">
      <Head>
        <title>Pomo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-mono flex flex-col items-center gap-16">
        <h1 className=" text-4xl text-purple-100">
          A simple Pomodoro timer app.
        </h1>
        <TimerDisplay secondsLeft={timeLeft} currStage={currStage} />
        <div className="flex flex-row gap-8">
          <PauseOrPlayButton
            isPlaying={isPlaying()}
            wasActiveBefore={everStarted}
            onPlayAction={onPlay}
            onPauseAction={onPause}
          />
          <PillButton text="Stop" onClickAction={onStop} />
          <StatsDisplay sessionCompleted={nSessions} />
        </div>
      </main>
    </div>
  );
}
