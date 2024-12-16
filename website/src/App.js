import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UnderConstruction from './pages/UnderConstruction';

export default function App () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UnderConstruction />} />
      </Routes>
    </Router>
  );
}
