// src/App.js
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Pricing from './components/Pricing';
import Login from './components/Login';
import NavBar from './components/NavBar/NavBar';
import './App.css';
import Registration from './components/Registration'; // Import Registration component
import ReportListContainer from './containers/ReportsContainer';
import CreateReport from './components/CreateReport/CreateReport';



function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/reportes" element={<ReportListContainer />} />
        <Route path="/reportes/crearReporte" element={<CreateReport />} />
      </Routes>
    </Router>
  );
}

export default App;
