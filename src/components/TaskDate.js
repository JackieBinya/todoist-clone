/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import moment from 'moment';
import { FaSpaceShuttle, FaRegPaperPlane, FaSun } from 'react-icons/fa';


export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) => (
  showTaskDate && (
    <div className="task-date" data-testid="task-date-overlay">
      <ul className="task-date__list">
        <li
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate(
              moment().format('DD/MM/YYYY'),
            );
          }}
          data-testid="task-date-overlay"
        >
          <span>
            <FaSpaceShuttle />
          </span>
          <span>Today</span>
        </li>
        <li
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate(
              moment()
                .add(1, 'days')
                .format('DD/MM/YYYY'),
            );
          }}
          data-testid="task-date-tomorrow"
        >
          <span>
            <FaSun />
          </span>
          <span>Today</span>
        </li>
        <li
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate(
              moment()
                .add(7, 'days')
                .format('DD/MM/YYYY'),
            );
          }}
          data-testid="task-date-next-week"
        >
          <span>
            <FaRegPaperPlane />
          </span>
          <span>Nex</span>
        </li>
      </ul>
    </div>

  )
);