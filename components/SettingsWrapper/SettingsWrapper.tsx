import { Settings } from 'react-feather';
import { Popover } from '@headlessui/react';
import SettingsPicker from '../SettingsPicker';
import Drawer from '../Drawer';
import { DrawerDirection, DrawerTheme } from '../Drawer/Drawer';
import { useFloating, offset, shift } from '@floating-ui/react-dom';

export default function SettingsWrapper() {
  const { x, y, reference, floating, strategy } = useFloating({
    placement: 'bottom-end',
    middleware: [offset(10), shift({ padding: 5 })],
  });

  const button = (
    <Settings
      className="transition-colors duration-500 ease-in-out group-hover:animate-hop stroke-hc-color group-hover:stroke-hc-color-accent"
      size={32}
    />
  );
  return (
    <>
      {/* Desktop-like UI. */}
      <div className="hidden lg:block">
        <Popover className="relative">
          <Popover.Button ref={reference}>{button}</Popover.Button>
          <Popover.Panel
            ref={floating}
            style={{
              position: strategy,
              top: y ?? '',
              left: x ?? '',
            }}
            className="z-10 w-60"
          >
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
              <SettingsPicker />
            </div>
          </Popover.Panel>
        </Popover>
      </div>
      {/* Mobile-like UI. */}
      <div className="block lg:hidden">
        <Drawer
          content={<SettingsPicker />}
          button={button}
          from={DrawerDirection.RIGHT}
          theme={DrawerTheme.LIGHT}
        />
      </div>
    </>
  );
}
