/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { FaPizzaSlice } from 'react-icons/fa';

export const Header = ({ darkMode, setDarkMode }) => {
  const [showMain, setShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);

  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <img src="/images/todoist.png" alt="Todoist Logo" />
        </div>
        <div className="settings">
          <ul>
            <li>
              +
            </li>
            <li
              className="settings__darkmode"
              onClick={() => setDarkMode(!darkMode)}
            >
              <FaPizzaSlice />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
