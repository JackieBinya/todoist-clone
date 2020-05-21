import React, { createContext, useContext } from 'react';
import { useProjects } from '../hooks';

// Create context
export const ProjectsContext = createContext();
// Create your provider
export const ProjectsProvider = ({ children }) => {
  // Define state, methods i.e value you want the context to provide
  const { projects, setProjects } = useProjects();

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};
/*
* Whenever this function is called in a fuction component
* It returns the value in the context's provider
* Which in this  case is the object {projects, setProjects}
*/
export const useProjectsValue = () => useContext(ProjectsContext);
