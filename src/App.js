import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Pricing from './components/Pricing';
import Login from './components/Login';
import NavBar from './components/NavBar/NavBar';
import './App.css';
import Registration from './components/Registration';
import ReportListContainer from './containers/ReportsContainer';
import CreateReport from './components/CreateReport/CreateReport';
import HomePage from './components/Bienvenida/Home';
import UserProfile from './components/Profile/Profile';
import { Auth } from './Context/AuthContext';
import MyReports from './components/MyReports/MyReports';
import { AllMyReports } from './Context/PersonalReportsContext';
import Tips from './components/Tips/Tips';
import Quiz from './components/Test/Test';
import ProtectedRoute from './components/ProtectedRoute.jsx/ProtectedRoute';
import AccessDenied from './components/Denied/AccesDenied';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ActivateAccount from './components/ActivateAccount/ActivateAccount';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Payment from './components/Payment/Payment';
function App() {
  return (
    <Auth>
      <AllMyReports>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/consejos" element={<Tips />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/activate/:token" element={<ActivateAccount />} />
            <Route path="/reestablecerContraseña" element={<ForgotPassword />} />
            <Route path="/reestablecerContraseña/:token" element={<ResetPassword />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/error" element={<AccessDenied />} />

            <Route element={<ProtectedRoute redirectTo="/login" />}>
              <Route path="/payment" element={<Payment />} />
              <Route path="/perfil" element={<UserProfile />} />
              <Route path="/misreportes" element={<MyReports />} />
            </Route>

            <Route element={<ProtectedRoute redirectTo="/error" />}>
              <Route path="/reportes/crearReporte" element={<CreateReport />} />
            </Route>

            <Route path="/reportes" element={<ReportListContainer />} />
          </Routes>
        </Router>
      </AllMyReports>
    </Auth>
  );
}

export default App;
