import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import EventDetails from './pages/EventDetails/EventDetails';
import AttractionDetails from './pages/AttractionDetails/AttractionDetails';
import Header from './components/Header/Header';
import Cart from './pages/Cart/Cart';
import Profile from './pages/Profile/Profile';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh' 
      }}>
        <Header />
        <main style={{ padding: '20px', flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/attraction/:id" element={<AttractionDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;