import React from 'react';
import { FaPizzaSlice } from 'react-icons/fa';

export const Header = () => (
  <header className="header" data-testid="header">
    <nav>
      <div className="logo">
        <img src="/images/todoist.png" alt="Todoist Logo" />
      </div>
      <div className="settings">
        <ul>
          <li className="settings__add">
            +
          </li>
          <li className="settings__darkmode">
            <FaPizzaSlice />
          </li>
        </ul>
      </div>
    </nav>
  </header>
);
