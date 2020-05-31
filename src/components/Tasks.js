import React, { useEffect } from 'react';
import { useTasks } from '../hooks';
import { Checkbox } from './Checkbox';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import { collatedTasks } from '../constants';
import { collatedTasksExist, getTitle, getCollatedTitle } from '../helpers';
import { AddTask } from './AddTask';

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);

  let projectName = '';

  if (projects && selectedProject && !collatedTasksExist(selectedProject)) {
    const project = getTitle(projects, selectedProject);
    projectName = project.name;
  }

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  });

  return (
    <div className="tasks">
      <ul className="tasks__list" data-testid="tasks">
        {tasks.map((task) => (
          <li key={`${task.id}`}>
            <Checkbox id="{task.id}" />
            <span>{task.name}</span>
          </li>
        ))}
      </ul>
      <AddTask />
    </div>
  );
};
