import SettingsPicker from '../SettingsPicker';
import ThemePicker from '../ThemePicker';

export default function Navbar() {
  return (
    <div className="z-20 flex flex-row self-stretch justify-end pt-6 px-6 leading-none gap-6">
      <div className="group">
        <SettingsPicker />
      </div>
      <div className="group">
        <ThemePicker />
      </div>
    </div>
  );
}
