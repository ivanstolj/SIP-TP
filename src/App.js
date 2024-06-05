// src/App.js
import React from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import Pricing from './components/Pricing';
import Login from './components/Login';
import './App.css';
import Registration from './components/Registration'; // Import Registration component



function App() {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/login';

  return (
      <div>
        <nav className={isLoginRoute ? 'active' : ''}>
          <Link to="/">Inicio</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Registrarse</Link> {/* Add link to Registration page */}
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} /> {/* Route for Registration page */}

          <Route path="/" element={<Pricing />} />
        </Routes>
      </div>
  );
}

export default App;
