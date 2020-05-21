import React from 'react';
import { Header } from './layout/Header';
import { Content } from './layout/Content';
import { ProjectsProvider, SelectedProjectProvider } from './context';

export const App = () => (
  <ProjectsProvider>
    <SelectedProjectProvider>
      <div className="App">
        <Header />
        <Content />
      </div>
    </SelectedProjectProvider>
  </ProjectsProvider>
);
