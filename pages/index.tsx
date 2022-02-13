import Head from 'next/head';
import StatsDisplay from '../components/StatsDisplay';
import Navbar from '../components/Navbar';
import WebNotification from '../components/WebNotification';
import { useAppState } from '../providers/app-state-context';
import Footer from '../components/Footer';
import TimerSection from '../components/TimerSection';

export default function Home() {
  const { appState } = useAppState();

  return (
    <>
      <Head>
        <title>Pomo</title>
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
