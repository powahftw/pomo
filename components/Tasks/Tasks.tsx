import { KeyboardEvent, useRef, useState } from 'react';
import { PlusCircle, Check, X } from 'react-feather';
import { hashCodeFrom } from '../../utils/utils';

export default function Tasks({ tasks, setTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskText, setTaskText] = useState('');
  const buttonRef = useRef(null);

  const IconToUse = isEditing ? Check : PlusCircle;

  const removeTask = (idToRemove: string) => {
    const tasksToKeep = tasks.filter(({ id }) => id !== idToRemove);
    setTasks([...tasksToKeep]);
  };

  const onEnterHandleKeyDown = (event: KeyboardEvent<any>, cb: Function) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      cb();
      // Prevent the event from possibly triggering twice "cb()" due to the focus shift.
      event.preventDefault();
    }
  };

  const onEscHandleKeyDown = (event: KeyboardEvent<any>) => {
    if (event.key === 'Escape' && !event.shiftKey && isEditing) {
      setTaskText('');
      setIsEditing(false);
      // Move the focus to the (+) button so the user can quickly add more tasks.
      buttonRef.current.focus();
    }
  };

  const handleSubmit = () => {
    if (isEditing) {
      const success = addTask(newTaskText.trim());
      if (success) {
        setIsEditing(false);
        // Move the focus to the (+) button so the user can quickly add more tasks.
        buttonRef.current.focus();
      }
    } else {
      setIsEditing(true);
    }
  };

  const addTask = (content) => {
    if (!content) {
      // If the task is empty it probably means the user is trying to dismiss the input.
      return true;
    }
    const id = hashCodeFrom(content).toString();
    if (tasks.map(({ id }) => id).includes(id)) {
      return false;
    }
    setTasks([...tasks, { id, content, isDeleted: false }]);
    setTaskText('');
    return true;
  };

  return (
    <>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-el-bg-hover-color px-4 py-4 flex items-center text-center justify-between shadow-lg rounded-sm min-w-full"
        >
          <span className="overflow-hidden text-ellipsis">{task.content}</span>
          <span className="group flex-shrink-0">
            <X
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                onEnterHandleKeyDown(e, () => removeTask(task.id))
              }
              onClick={() => removeTask(task.id)}
              size={24}
              className="group-hover:animate-hop stroke-main-color group-hover:stroke-main-color-accent"
            />
          </span>
        </div>
      ))}
      <div className="py-1 flex justify-between transition-colors duration-500 ease-in-out min-w-full">
        {isEditing && (
          <input
            className="will-change-transform animate-slideInFromLeft appearance-none border rounded-sm px-4 py-4 shadow-lg text-gray-700 leading-tight focus:outline-none grow focus:shadow-outline"
            type="text"
            autoFocus
            placeholder="Add a description"
            value={newTaskText}
            onKeyDown={(e) => {
              onEnterHandleKeyDown(e, handleSubmit);
              onEscHandleKeyDown(e);
            }}
            onChange={(e) => setTaskText(e.target.value)}
          />
        )}
        <button
          type="button"
          ref={buttonRef}
          onClick={() => handleSubmit()}
          className="group ml-2"
        >
          <IconToUse
            size={36}
            className="group-hover:animate-hop stroke-hc-color group-hover:stroke-hc-color-accent"
          />
        </button>
        {tasks.length == 0 && !isEditing && (
          <span
            className="relative bg-blue-200 rounded-lg inline-flex items-center px-2 py-1 ml-3
                       after:content-[''] after:absolute after:top-0 after:left-0 after:bottom-0 after:w-0 after:h-0
                       after:-mx-[6px] after:my-auto after:border-r-[6px] after:border-b-[6px] after:border-t-[6px]
                       after:border-transparent after:border-r-blue-200 mr-auto"
          >
            {'Add Task!'}
          </span>
        )}
      </div>
    </>
  );
}
