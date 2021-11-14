import Head from "next/head";
import PillButton from "../components/PillButton";
import "tailwindcss/tailwind.css";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { Stage, State } from "../types/enum";
import PauseOrPlayButton from "../components/PauseOrPlayButton";
import TimerReducer from "../utils/timerReducer";
import DefaultValues from "../utils/DefaultValues";

import CircleAnimation from "../components/CircleAnimation";
import TimerDisplay from "../components/TimerDisplay";

export default function Home() {
  const defaultValues = DefaultValues;

  const stageToTime = new Map<Stage, number>([
    [Stage.WORK, defaultValues.DEFAULT_WORK_TIME],
    [Stage.REST, defaultValues.DEFAULT_REST_TIME],
  ]);

  const initialState = {
    currState: defaultValues.DEFAULT_STATE,
    currStage: defaultValues.DEFAULT_STAGE,
    timeLeft: stageToTime.get(defaultValues.DEFAULT_STAGE),
    nSessions: 0,
  };

  const timerRef = useRef(null);
  const reducer = TimerReducer;
  const [state, dispatch] = useReducer(reducer, initialState);

  // Handles creating timer on play
  useEffect(() => {
    if (state.currState !== State.PLAYING) {
      return;
    }
    timerRef.current = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [state.currState]);

  // Handles time elapsed
  useEffect(() => {
    if (state.timeLeft < 0) {
      dispatch({ type: "switch" });
    }
  }, [state.timeLeft]);

  const isPlaying = () => state.currState === State.PLAYING;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Pomo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-mono flex flex-col items-center gap-16">
        <h1 className=" text-4xl text-blue-500">
          A simple Pomodoro timer app.
        </h1>
        <CircleAnimation
          currStage={state.currStage}
          timeLeft={state.timeLeft}
          totalTime={
            state.currStage === Stage.WORK
              ? stageToTime.get(Stage.WORK)
              : stageToTime.get(Stage.REST)
          }
        >
          <TimerDisplay
            secondsLeft={state.timeLeft}
            currStage={state.currStage}
          />
        </CircleAnimation>
        <div className="flex flex-row gap-8">
          <PauseOrPlayButton
            isPlaying={isPlaying()}
            wasActiveBefore={false}
            onPlayAction={() => dispatch({ type: "start" })}
            onPauseAction={() => dispatch({ type: "pause" })}
          />
          <PillButton
            text="Stop"
            onClickAction={() => dispatch({ type: "stop" })}
          />
        </div>
      </main>
    </div>
  );
}
