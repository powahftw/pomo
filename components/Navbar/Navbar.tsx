import SettingsWrapper from '../SettingsWrapper';
import TasksWrapper from '../TasksWrapper';
import ThemePicker from '../ThemePicker';

export default function Navbar() {
  return (
    <div className="z-20 flex flex-row self-stretch justify-between pt-6 px-6 my-1">
      <div>
        <TasksWrapper />
      </div>
      <div className="flex flex-row gap-6 leading-none">
        <div className="group">
          <SettingsWrapper />
        </div>
        <div className="group">
          <ThemePicker />
        </div>
      </div>
    </div>
  );
}
