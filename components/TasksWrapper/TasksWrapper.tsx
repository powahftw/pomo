import { Edit } from 'react-feather';
import Tasks from '../Tasks';
import css from './TasksWrapper.module.css';

import { Task, tasksLSKey } from '../../types/tasks';
import usePersistedState from '../../hooks/usePersistedState';
import Drawer from '../Drawer';
import { DrawerDirection, DrawerTheme } from '../Drawer/Drawer';

export default function TasksWrapper() {
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
        <Drawer
          content={
            <>
              <div className="flex items-center flex-col grow p-4 gap-2">
                <Tasks tasks={tasks} setTasks={setTasks} />
              </div>
            </>
          }
          button={
            <>
              <Edit
                size={32}
                className="group-hover:animate-hop stroke-hc-color group-hover:stroke-hc-color-accent"
              />
            </>
          }
          from={DrawerDirection.LEFT}
          theme={DrawerTheme.DARK}
        />
      </div>
    </>
  );
}
