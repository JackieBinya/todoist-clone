/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState } from 'react';
import {
  FaCalendarAlt, FaInbox, FaCalendar, FaChevronDown,
} from 'react-icons/fa';
import { Projects } from '../components/Projects';
import { AddProject } from '../components/AddProject';
import { useSelectedProjectValue } from '../context';

export const Sidebar = () => {
  const { setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState('inbox');
  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li
          className={active === 'inbox' ? 'active' : undefined}
          data-testid="inbox"
          onClick={() => {
            setActive('inbox');
            setSelectedProject('INBOX');
          }}
          onKeyDown={() => {
            setActive('inbox');
            setSelectedProject('INBOX');
          }}
        >
          <span>
            <FaInbox />
          </span>
          <span>
            Inbox
          </span>
        </li>
        <li
          className={active === 'today' ? 'active' : undefined}
          data-testid="today"
          onClick={() => {
            setActive('today');
            setSelectedProject('TODAY');
          }}
          onKeyDown={() => {
            setActive('today');
            setSelectedProject('TODAY');
          }}
        >
          <span>
            <FaCalendar />
          </span>
          <span>
            Today
          </span>
        </li>
        <li
          className={active === 'next_7' ? 'active' : undefined}
          data-testid="next_7"
          onClick={() => {
            setActive('next_7');
            setSelectedProject('NEXT_7');
          }}
          onKeyDown={() => {
            setActive('next_7');
            setSelectedProject('NEXT_7');
          }}
        >
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
          <FaChevronDown
            className={!showProjects ? 'hidden-projects' : undefined}
          />
        </span>
        <h2>Projects</h2>
      </div>

      <ul className="sidebar__projects">{showProjects && <Projects />}</ul>

      { showProjects && <AddProject /> }

    </div>

  );
};
