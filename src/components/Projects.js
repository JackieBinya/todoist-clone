/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useState } from 'react';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import { IndividualProject } from './IndividualProject';

export const Projects = ({ activeValue = null }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  return (
    projects && projects.map(({ projectId, id, name }) => (
      <li
        role="button"
        key={projectId}
        data-doc-id={id}
        data-testid="project"
        className={
          active === projectId
            ? 'active sidebar-project'
            : 'sidebar-project'
        }
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            setActive(projectId);
            setSelectedProject(projectId);
          }}
          onKeyDown={() => {
            setActive(projectId);
            setSelectedProject(projectId);
          }}
        >
          <IndividualProject project={{ projectId, id, name }} />
        </div>
      </li>
    ))
  );
};
