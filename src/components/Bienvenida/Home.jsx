import React from 'react';
import { Box, Typography, Container, Button, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const manageNews = () => {
    window.location.href = 'https://www.ambito.com/ciberseguridad-a5122903';
  };

  return (
    <Container maxWidth="lg" className="home-container">
      <Box className="welcome-box" sx={{ textAlign: 'center', py: 5 }}>
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
      <Box className="info-box" sx={{ mt: 5, py: 5 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          ¿Qué puedes hacer en CyberGuard?
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          En CyberGuard, puedes reportar correos electrónicos, páginas web y números de teléfono que consideres sospechosos o maliciosos.
          Tu contribución ayuda a crear un entorno más seguro para todos.
        </Typography>
        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 4 }}>
          ¿Cómo reportar?
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Dirígete a la página de reportes, selecciona el tipo de reporte que deseas hacer (correo, página web o teléfono), llena el formulario con la información requerida y envíalo.
        </Typography>
        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 4 }}>
          Página de Perfil
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          En tu perfil, puedes ver y editar tu información personal. Asegúrate de mantener tus datos actualizados para una mejor experiencia.
        </Typography>
        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 4 }}>
          Mis Reportes
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          En la sección "Mis Reportes", puedes ver todos los reportes que has enviado, su estado y detalles adicionales. Mantén un seguimiento de tus contribuciones.
        </Typography>
      </Box>
      <Grid container spacing={4} sx={{ mt: 5 }}>
        <Grid item xs={12} md={4}>
          <Card className="feature-card">
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Reportes de Emails
              </Typography>
              <Typography variant="body1" component="p">
                Informa sobre correos electrónicos sospechosos o maliciosos.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="feature-card">
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Reportes de Páginas Web
              </Typography>
              <Typography variant="body1" component="p">
                Advierte sobre sitios web que podrían ser peligrosos.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="feature-card">
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Reportes de Teléfonos
              </Typography>
              <Typography variant="body1" component="p">
                Notifica números de teléfono utilizados para fraudes.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box className="additional-info-box" sx={{ mt: 5, py: 5 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Recursos adicionales
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card className="resource-card">
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Consejos de Seguridad
                </Typography>
                <Typography variant="body1" component="p">
                  Aprende a protegerte contra amenazas comunes en línea con nuestros consejos de seguridad.
                </Typography>
                <Link to="/consejos" className="link">
                  <Button variant="contained" color="primary" size="large" sx={{ mt: 3 }}>
                    Ver consejos
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="resource-card">
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Noticias y Actualizaciones
                </Typography>
                <Typography variant="body1" component="p">
                  Mantente informado sobre las últimas noticias y actualizaciones en el ámbito de la ciberseguridad.
                </Typography>
                <Link onClick={manageNews} className="link">
                  <Button variant="contained" color="primary" size="large" sx={{ mt: 3 }}>
                    Ver noticias
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default HomePage;
