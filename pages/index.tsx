import Head from 'next/head';
import StatsDisplay from '../components/StatsDisplay';
import Navbar from '../components/Navbar';
import WebNotification from '../components/WebNotification';
import { useAppState } from '../providers/app-state-context';
import Footer from '../components/Footer';
import TimerSection from '../components/TimerSection';
import { Stage, TimerState } from '../types/enum';

export default function Home() {
  const { appState } = useAppState();

  const symbolToUse = {
    [TimerState.PLAYING]: '▶ ',
    [TimerState.PAUSED]: '❚❚ ',
    [TimerState.STOPPED]: ' ',
  }[appState.timerState];

  const currStateDescription =
    ' - ' +
    {
      [Stage.WORK]: 'Work',
      [Stage.LONG_REST]: 'Rest',
      [Stage.SHORT_REST]: 'Rest',
    }[appState.stage] +
    '!';

  const shouldShowStateDescription = [
    TimerState.PLAYING,
    TimerState.PAUSED,
  ].includes(appState.timerState);

  const title = `${symbolToUse}Pomo ${
    shouldShowStateDescription ? currStateDescription : ''
  }`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col bg-bg-color transition ease-in-out duration-300">
        <Navbar />
        <TimerSection />
        <Footer />
        <WebNotification />
        <StatsDisplay cycleCompleted={appState.cycleCompleted} />
      </div>
    </>
  );
}
