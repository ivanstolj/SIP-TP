import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AccessDenied = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        403 - Acceso Denegado
      </Typography>
      <Typography variant="body1" gutterBottom>
        No tienes permiso para acceder a esta página.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/login">
        Ir al Login
      </Button>
    </Container>
  );
};

export default AccessDenied;
