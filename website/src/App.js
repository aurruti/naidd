import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import LangMenu from './components/LangMenu';

import UnderConstruction from './pages/UnderConstruction';
import ProjectsPage from './pages/Projects';

import NotFound from './pages/error-pages/404';

export function RouterApp () {
  const location = useLocation();

  return (
      <div style={styles.globalBackground}>
        <div style={styles.langButtonContainer}>
          <LangMenu />
        </div>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}> 
              <UnderConstruction /></motion.div>} />
            <Route path="/projects" element={<motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}>
              <ProjectsPage /></motion.div>} />
            <Route path="*" element={<motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}>
              <NotFound /></motion.div>} />
          </Routes>
        </AnimatePresence>
      </div>
  );
}

export default function App() {
  return (
    <Router>
      <RouterApp />
    </Router>
  );
}

const styles = {
  globalBackground: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    //paddingTop: '20px',
    //paddingBottom: '10px',
    backgroundColor: '#4A4A4A',
  },
  langButtonContainer: {
      position: 'absolute',
      paddingTop: '50px',
  },
}