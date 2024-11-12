import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import EventDetails from './pages/EventDetails/EventDetails';
import AttractionDetails from './pages/AttractionDetails/AttractionDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/attraction/:id" element={<AttractionDetails />} />
      </Routes>
    </Router>
  );
}

export default App;