import { DialogContent, DialogOverlay } from '@reach/dialog';
import { useState } from 'react';
import { X } from 'react-feather';

export enum DrawerDirection {
  LEFT,
  RIGHT,
}

export enum DrawerTheme {
  LIGHT,
  DARK,
}

export default function Drawer({ content, button, from, theme }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const directionClasses =
    from === DrawerDirection.LEFT
      ? 'left-0 animate-slideInFromLeft'
      : 'right-0 animate-slideInFromRight';

  const xPositionClass =
    from === DrawerDirection.LEFT ? 'justify-end' : 'justify-start';

  return (
    <>
      <DialogOverlay
        isOpen={isPanelOpen}
        onDismiss={() => setIsPanelOpen(false)}
        className="fixed top-0 left-0 right-0 bottom-0 bg-black/[0.5]"
      >
        <DialogContent
          aria-label="Side Panel"
          className={`${
            theme === DrawerTheme.DARK ? 'bg-bg-color' : 'bg-el-bg-color'
          } min-w-full md:min-w-[60%] md:shadow-xl absolute will-change-transform top-0 bottom-0 ${directionClasses}`}
        >
          <div className={`flex mt-6 mx-4 ${xPositionClass}`}>
            <button
              type="button"
              className="group"
              onClick={() => setIsPanelOpen(false)}
            >
              <X
                size={32}
                className={`group-hover:animate-hop ${
                  theme === DrawerTheme.DARK
                    ? 'stroke-hc-color group-hover:stroke-hc-color-accent'
                    : 'stroke-main-color group-hover:stroke-main-color-accent'
                } `}
              />
            </button>
          </div>
          {content}
        </DialogContent>
      </DialogOverlay>
      <button
        type="button"
        className="group"
        onClick={() => setIsPanelOpen(true)}
      >
        {button}
      </button>
    </>
  );
}
