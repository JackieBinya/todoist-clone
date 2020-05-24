/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState } from 'react';
import {
  FaCalendarAlt, FaInbox, FaCalendar, FaChevronDown,
} from 'react-icons/fa';
import { Projects } from '../components/Projects';
import { AddProject } from '../components/AddProject';

export const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(false);

  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li>
          <span>
            <FaInbox />
          </span>
          <span>
            Inbox
          </span>
        </li>
        <li>
          <span>
            <FaCalendar />
          </span>
          <span>
            Today
          </span>
        </li>
        <li>
          <span>
            <FaCalendarAlt />
          </span>
          <span>
            Next 7 Days
          </span>
        </li>
      </ul>

      <div
        role="button"
        className="sidebar__middle"
        onClick={() => (setShowProjects(!showProjects))}
        onKeyPress={() => (setShowProjects(!showProjects))}
      >
        <span>
          <FaChevronDown />
        </span>
        <h2>Projects</h2>
      </div>

      <ul className="sidebar__projects">{showProjects && <Projects />}</ul>

      { showProjects && <AddProject /> }

    </div>

  );
};
