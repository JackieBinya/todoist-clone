import { collatedTask } from '../constants';

export const collatedTaskExist = (selectedProject) => {
  collatedTask.find((task) => task.key !== selectedProject);
};
