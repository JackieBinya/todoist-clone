/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';

const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);


  useEffect(() => {
    let unsubscribe = firebase
      .firestore
      .collection('tasks')
      .where('userId', '==', '1');

    unsubscribe = selectedProject && !collatedTasksExist(selectedProject)
      ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
      : (selectedProject === 'Today')
        ? (unsubscribe.where('date', '==', moment.format('DD/MM/YYYY')))
        : (selectedProject === 'Inbox' || selectedProject === 0)
          ? (unsubscribe.where('date', '==', ''))
          : (selectedProject === 'Incoming')
            ? unsubscribe = unsubscribe.orderBy('date')
            : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot((data) => {
      const newTasks = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTasks(newTasks.filter((task) => task.archived === !true));
      setArchivedTasks(newTasks.filter((task) => task.archived === true));
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const unsubcribe = firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', '1')
      .onSnapshot((data) => {
        const newProjects = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProjects([...newProjects]);
      });

    return () => unsubcribe();
  }, [projects]);

  return { projects };
};


export {
  useTasks,
  useProjects,
};
