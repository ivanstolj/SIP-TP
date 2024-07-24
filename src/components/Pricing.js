// src/components/Pricing.js
import React, { useState, useContext } from 'react';
import { Box, Button, Container, TextField, Typography, Grid, Paper } from '@mui/material';
import ContextoAuth from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/PricingApp.css';

const Pricing = () => {
  const { user, isLogged } = useContext(ContextoAuth);
  const navigate = useNavigate();
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogged) {
      // Aquí enviarías la solicitud a tu backend
      console.log('Contact Info:', contactInfo);
      // Navegar a una página de confirmación o mostrar un mensaje de éxito
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="PricingApp">
      <Container maxWidth="md" className="app-container">
        <Paper elevation={3} className="contact-form">
          <Typography variant="h4" className="header-topic">
            Soluciones Empresariales
          </Typography>
          <Typography variant="body1" className="header-description">
            Ponte en contacto con nosotros para obtener soluciones personalizadas para tu empresa.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Nombre"
              name="name"
              value={contactInfo.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Correo Electrónico"
              name="email"
              type="email"
              value={contactInfo.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Empresa"
              name="company"
              value={contactInfo.company}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Mensaje"
              name="message"
              value={contactInfo.message}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="button-primary"
              sx={{ mt: 2 }}
            >
              Enviar
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Pricing;
