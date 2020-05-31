import React, { useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import { firebase } from '../firebase';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import { ProjectOverlay } from './ProjectOverlay';
import { TaskDate } from './TaskDate';
/*
showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        setShouldShowMain={setShouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}

         showAddTaskMain = true,
  showShouldMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
 */
export const AddTask = ({
  showAddTaskMain = true,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
}) => {
  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [project, setProject] = useState('');
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);

  const { selectedProject } = useSelectedProjectValue();

  const addTask = () => {
    const projectId = project || selectedProject;
    let collatedDate = '';

    if (projectId === 'TODAY') {
      collatedDate = moment().format('DD/MM/YYYY');
    } else if (projectId === 'NEXT_7') {
      collatedDate = moment()
        .add(7, 'days')
        .format('DD/MM/YYYY');
    }
    return (
      task
      && projectId
      && firebase
        .firestore()
        .collection('tasks')
        .add({
          archived: false,
          projectId,
          name: task,
          date: collatedDate || taskDate,
          userId: '1',
        })
        .then(() => {
          setTask('');
          setProject('');
          setShowMain('');
          setShowProjectOverlay(false);
        })
    );
  };
  // Revisit conditionally rendered class names like those
  return (
    <div
      className={showQuickAddTask ? 'add-task add-task__overlay' : 'add_task'}
      data-testid="add-task-comp"
    >
      { showAddTaskMain && (
      <div
        role="button"
        tabIndex={0}
        className="add-task__shallow"
        data-testid="show-main-action"
        onClick={() => setShowMain(!showMain)}
        onKeyDown={() => setShowMain(!showMain)}
      >
        <span className="add-task__plus">+</span>
        <span className="add-task__text">Add Task</span>
      </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div className="add-task__main" data-test-id="add-task-main">
          { showQuickAddTask && (
            <>
              <div data-testid="quick-add-task">
                <h2 className="header">Quick Add</h2>
                <span
                  role="button"
                  tabIndex={0}
                  className="add-task__cancel-x"
                  data-testid="add-task-cancel"
                  onClick={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask(false);
                  }}
                  onKeyDown={() => {
                    setShowMain(!false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask(false);
                  }}
                >
                  x
                </span>
              </div>
            </>
          )}

          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />

          <TaskDate setTaskDate={setTaskDate} setShowTaskDate={setShowTaskDate} showTaskDate={showTaskDate} />

          <input
            type="text"
            className="add-task__content"
            datatestid="add-task-content"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Type a task here"
          />
          <button
            type="button"
            onClick={() => (showQuickAddTask ? (addTask() && setShowQuickAddTask(false)) : addTask())}
            className="add-task__submit"
            data-testid="add-task"
          >
            Add Task
          </button>
          { !showQuickAddTask && (
            <span
              role="button"
              tabIndex={0}
              className="add-task__cancel"
              data-testid="add-test-main-cancel"
              onClick={() => {
                setShowMain(false);
                setShowProjectOverlay(false);
              }}
              onKeyDown={() => {
                setShowMain(false);
                setShowProjectOverlay(false);
              }}
            >
              Cancel
            </span>
          )}
          <span
            role="button"
            tabIndex={0}
            className="add-task__project"
            data-testid="show-project-overlay"
            onClick={
            () => {
              setShowProjectOverlay(!showProjectOverlay);
            }
}
            onKeyDown={
            () => {
              setShowProjectOverlay(!setShowProjectOverlay);
            }
          }
          >
            <FaRegListAlt />
          </span>

          <span
            role="button"
            tabIndex={0}
            className="add-task__date"
            data-testid="show-task-date-overlay"
            onClick={() => setShowTaskDate(!showTaskDate)}
            onKeyDown={() => setShowTaskDate(!showTaskDate)}
          >
            <FaRegCalendarAlt />
          </span>


        </div>
      )}
    </div>
  );
};
