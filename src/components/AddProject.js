import React, { useState } from 'react';
import { generatePushId } from '../helpers';
import { useProjectsValue } from '../context';
import { firebase } from '../firebase';

export const AddProject = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState('');
  const { setProjects } = useProjectsValue();

  const projectId = generatePushId();

  const addProject = () => projectName
  && firebase
    .firestore()
    .collection('projects')
    .add({
      projectId,
      name: projectName,
      userId: '1',
    })
    .then(() => {
      setProjects([]);
      setProjectName('');
      setShow(false);
    });

  return (
    <div className="add-project" data-testid="add-project">
      {
          show && (
          <div className="add-project__input">
            <input
              className="add-project__name"
              onChange={(e) => setProjectName(e.target.value)}
              type="text"
              data-testid="project-name"
              placeholder="Type your project here"
            />
            <button
              className="add-project__submit"
              onClick={() => addProject()}
              data-testid="add-project-submit"
              type="button"
            >
              Add Project
            </button>

            <span
              data-testid="hide-project-overlay"
              className="add-project__cancel"
              onClick={() => setShow(false)}
              onKeyDown={() => setShow(false)}
              role="button"
              tabIndex="0"
            >
              Cancel
            </span>
          </div>
          )
}
      <span className="add-project__plus">+</span>
      <span
        data-testid="add-project-action"
        className="add-project__text"
        onClick={() => setShow(!show)}
        onKeyDown={() => setShow(!show)}
        role="button"
        tabIndex="0"
      >
        Add Project
      </span>
    </div>
  );
};
