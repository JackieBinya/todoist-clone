import React from 'react';
import { FaPizzaSlice, FaPlus } from 'react-icons/fa';

export const Header = () => (
  <header>
    <div className="logo">
      <img src="/images/todoist.png" alt="Todoist Logo" />
    </div>
    <div>
      <ul className="settings">
        <li>
          <FaPlus />
        </li>
        <li>
          <FaPizzaSlice />
        </li>
      </ul>
    </div>
  </header>
);
