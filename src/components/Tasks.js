import React from 'react';
import { useTasks, useProjects } from '../hooks';
import { Checkbox } from './Checkbox';

export const Tasks = () => {
  // eslint-disable-next-line no-console
  const { tasks } = useTasks('1');
  const { projects } = useProjects();

  console.log(projects);

  return (
    <div className="tasks">
      <ul className="tasks__list" data-testid="tasks">
        {tasks.map((task) => (
          <li key={`${task.id}`}>
            <Checkbox id="{task.id}" />
            <span className="">{tasks.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
