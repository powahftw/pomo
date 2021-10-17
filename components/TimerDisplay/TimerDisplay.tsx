import { Stage } from '../../types/enum';

export default function TimerDisplay({ secondsLeft, currStage }) {
  const secondstoHHMMSS = (sec: number) => {
    const h = Math.floor(sec / (60 * 60));
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return (
      [h, m, s]
        // If hours are 0 we skip it.
        .filter((val, idx) => val !== 0 || idx > 0)
        .map((val) => (val < 10 ? '0' : '') + val)
        .join(':')
    );
  };

  const currColor = currStage === Stage.WORK ? 'bg-red-900' : 'bg-green-800';

  return (
    <div
      className={`transition-colors duration-700 w-64 h-64 ${currColor} rounded-full grid place-items-center`}
    >
      <span className="text-5xl text-white font-mono">
        {secondstoHHMMSS(secondsLeft)}
      </span>
    </div>
  );
}
