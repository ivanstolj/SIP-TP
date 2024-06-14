import React from 'react';
import { Box, Typography, Container, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <Container maxWidth="lg" className="home-container">
      <Box sx={{ textAlign: 'center', py: 5 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Bienvenido a CyberGuard
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Ayúdanos a concientizar a las personas sobre la seguridad informática reportando correos, páginas web o teléfonos maliciosos.
        </Typography>
        <Link to="/reportes" className="link">
          <Button variant="contained" color="primary" size="large" sx={{ mt: 3 }}>
            Ver reportes
          </Button>
        </Link>
      </Box>
      <Grid container spacing={4} sx={{ mt: 5 }}>
        <Grid item xs={12} md={4}>
          <Box className="feature-box" sx={{ textAlign: 'center', p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Reportes de Emails
            </Typography>
            <Typography variant="body1" component="p">
              Informa sobre correos electrónicos sospechosos o maliciosos.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box className="feature-box" sx={{ textAlign: 'center', p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Reportes de Páginas Web
            </Typography>
            <Typography variant="body1" component="p">
              Advierte sobre sitios web que podrían ser peligrosos.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box className="feature-box" sx={{ textAlign: 'center', p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Reportes de Teléfonos
            </Typography>
            <Typography variant="body1" component="p">
              Notifica números de teléfono utilizados para fraudes.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
