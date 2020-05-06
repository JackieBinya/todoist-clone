import React from 'react';
import {
  FaCalendarAlt, FaInbox, FaCalendar, FaChevronDown,
} from 'react-icons/fa';

export const Sidebar = () => (
  <aside>
    <div className="sidebar-top" data-testid="sidebar">
      <ul>
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
    </div>
    <div className="sidebar-middle">
      <span>
        <FaChevronDown />
      </span>
      <h3>Projects</h3>
    </div>
    <h4>Add Projects comes here!!!</h4>
  </aside>
);
