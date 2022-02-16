import { Settings } from 'react-feather';
import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import SettingsPicker from '../SettingsPicker';
import Drawer from '../Drawer';
import { DrawerDirection, DrawerTheme } from '../Drawer/Drawer';

export default function SettingsWrapper() {
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
          <Popover.Button>{button}</Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 w-60 px-2 mt-3 transform sm:px-0 -right-2.5">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
                <SettingsPicker />
              </div>
            </Popover.Panel>
          </Transition>
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
