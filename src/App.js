import React, { useState } from 'react';
import { Header } from './layout/Header';
import { Content } from './layout/Content';
import { ProjectsProvider, SelectedProjectProvider } from './context';

export const App = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);
  return (
    <ProjectsProvider>
      <SelectedProjectProvider>
        <main
          className={darkMode || undefined}
          data-testid="application"
        >
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Content />
        </main>
      </SelectedProjectProvider>
    </ProjectsProvider>
  );
};
