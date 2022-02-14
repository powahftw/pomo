import { Edit, X } from 'react-feather';
import Tasks from '../Tasks';
import css from './TasksWrapper.module.css';

import { DialogContent, DialogOverlay } from '@reach/dialog';
import { useState } from 'react';
import { Task, tasksLSKey } from '../../types/tasks';
import usePersistedState from '../../hooks/usePersistedState';

export default function TasksWrapper() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [tasks, setTasks] = usePersistedState<Task[]>([], tasksLSKey);

  return (
    <>
      {/* Desktop-like UI. */}
      <div className="hidden lg:block">
        <div
          className={`px-4 absolute top-0 bottom-0 left-0 flex flex-col gap-2 z-10 overflow-y-auto ${css.scrollbar} w-72`}
        >
          <Tasks tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
      {/* Mobile-like UI. */}
      <div className="block lg:hidden">
        <DialogOverlay
          isOpen={isPanelOpen}
          onDismiss={() => setIsPanelOpen(false)}
          className="fixed top-0 left-0 right-0 bottom-0 bg-black/[0.5]"
        >
          <DialogContent
            aria-label="Tasks Menu"
            className="bg-bg-color min-w-full md:min-w-[60%] absolute top-0 left-0 bottom-0 will-change-transform animate-slideInFromLeft"
          >
            <div className="flex justify-end mt-6 mr-6">
              <button
                type="button"
                className="group"
                onClick={() => setIsPanelOpen(false)}
              >
                <X
                  size={32}
                  className="group-hover:animate-hop stroke-hc-color group-hover:stroke-hc-color-accent"
                />
              </button>
            </div>
            <div className="flex items-center flex-col grow p-4 gap-2">
              <Tasks tasks={tasks} setTasks={setTasks} />
            </div>
          </DialogContent>
        </DialogOverlay>
        <button
          type="button"
          className="absolute group"
          onClick={() => setIsPanelOpen(true)}
        >
          <Edit
            size={32}
            className="group-hover:animate-hop stroke-hc-color group-hover:stroke-hc-color-accent"
          />
        </button>
      </div>
    </>
  );
}
