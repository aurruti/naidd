import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LangMenu from './components/LangMenu';

import UnderConstruction from './pages/UnderConstruction';
import ProjectsPage from './pages/Projects';

export default function App () {
  return (
    <Router>
        <div style={styles.globalBackground}>
          <div style={styles.langButtonContainer}>
          <LangMenu />
          </div>
          <Routes>
            <Route path="/" element={<UnderConstruction />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </div>
    </Router>
  );
}

const styles = {
  globalBackground: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: '20px',
    paddingBottom: '10px',
    // backgroundColor: 'red',
  },
  langButtonContainer: {
      position: 'absolute',
      paddingTop: '20px',
  },
}