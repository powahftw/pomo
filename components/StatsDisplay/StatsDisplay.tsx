import { Award, CheckCircle, Circle, Coffee, Icon } from 'react-feather';
import { CompletedStageType } from '../../store/timer';
import { Stage } from '../../types/enum';

type StatDisplay = {
  Icon: Icon;
  value: number;
  bgColor: string;
};

export default function StatsDisplay({
  cycleCompleted,
}: {
  cycleCompleted: CompletedStageType;
}) {
  const {
    [Stage.WORK]: workN,
    [Stage.SHORT_REST]: shortRestN,
    [Stage.LONG_REST]: longRestN,
  } = cycleCompleted;
  const totalRestN = shortRestN + longRestN;
  const anySessionCompleted = workN + totalRestN > 0;

  const statsToDisplay: StatDisplay[] = [
    { Icon: CheckCircle, value: workN, bgColor: 'el-bg-color' },
    { Icon: Coffee, value: totalRestN, bgColor: 'emerald-100' },
  ];

  return (
    <>
      {cycleCompleted && anySessionCompleted && (
        <div className="absolute bottom-6 left-6 flex gap-4">
          {statsToDisplay
            .filter(({ value }) => value > 0)
            .map(({ Icon, value, bgColor }) => (
              <span
                className={`border-solid border-2 border-el-bg-hover-color rounded-full bg-${bgColor} px-4 py-2 flex gap-2 items-center font-medium text-xl`}
              >
                <Icon size={24} />
                {value}
              </span>
            ))}
        </div>
      )}
    </>
  );
}
