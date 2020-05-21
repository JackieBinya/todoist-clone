/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';

/* NOTES
    - firebase is a real-time database
    - this means we can subcribe to firebase to listen to changes in the data
    - i.e.invoke event-listerners which in turn send snapshots of the updated data automatically
    - in  practise what this means is that we only ever need to come up with logic
    - to process the data retrieved from our subscription to firestore
    - updating the state of the tasks can be done within components directly,
    - for that reason we do not to return setTasks in the  custom hook
    //////// Another method of retriving data from firebase is using functions
    - particulary the get method as shown in the second custom hook
    */

const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', '1');

    unsubscribe = selectedProject && !collatedTasksExist(selectedProject)
      ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
      : (selectedProject === 'TODAY')
        ? (unsubscribe.where('date', '==', moment.format('DD/MM/YYYY')))
        : (selectedProject === 'INBOX' || selectedProject === 0)
          ? (unsubscribe.where('date', '==', ''))
          : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot((data) => {
      const newTasks = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(
        selectedProject === 'NEXT_7'
          ? newTasks.filter((task) => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 && task.archived !== true)
          : newTasks.filter((task) => task.archived !== true),
      );

      setArchivedTasks(newTasks.filter((task) => task.archived === true));
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', '1')
      // Compound query find out why you have to do indexing
      .orderBy('projectId')
      .get()
      .then((data) => {
        const allProjects = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // Only update state when new project is added?????
        if (JSON.stringify(allProjects) !== projects) {
          setProjects([...allProjects]);
        }
      });
  }, [projects]);

  return { projects, setProjects };
};

export {
  useTasks,
  useProjects,
};
