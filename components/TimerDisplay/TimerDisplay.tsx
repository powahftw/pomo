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

  const currColor =
    currStage === Stage.WORK
      ? 'bg-gradient-to-r from-red-500 via-red-700 to-red-500'
      : 'bg-gradient-to-r from-green-500 via-green-700 to-green-500';

  return (
    <div
      className={`transition-colors duration-700 
      w-64 h-64 
      ${currColor} shadow-2xl border-solid border-4 border-light-blue-500  rounded-full grid place-items-center`}
    >
      <span className="text-5xl text-white font-mono">
        {secondstoHHMMSS(secondsLeft)}
      </span>
    </div>
  );
}
