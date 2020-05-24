/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { firebase } from '../firebase';
import { useProjectsValue, useSelectedProjectValue } from '../context';

export const IndividualProject = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { setProjects, projects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = (docId) => {
    firebase
      .firestore()
      .collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects]);
        setSelectedProject('INBOX');
      });
  };
  return (
    <>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">
        {project.name}
      </span>
      <span
        role="button"
        className="sidebar__project-delete"
        onClick={() => (setShowConfirm(!showConfirm))}
        onKeyPress={() => (setShowConfirm(!showConfirm))}
      >
        <FaTrashAlt />
      </span>
      {showConfirm && (
        <div
          className="project-delete-modal"
        >
          <div className="project-delete-modal__inner">
            <p>Are you sure you want to delete this project?</p>
            <button
              type="button"
              onClick={() => deleteProject(project.id)}
            >
              Delete
            </button>
            <span
              role="button"
              onClick={() => setShowConfirm(!showConfirm)}
              onKeyPress={() => setShowConfirm(!showConfirm)}
            >
              Cancel
            </span>
          </div>
        </div>
      )}
    </>
  );
};
