import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, TextField, LinearProgress, Button } from '@mui/material';
import './Tips.css';

function Tips() {
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [url, setUrl] = useState('');
  const [httpsStatus, setHttpsStatus] = useState('');

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 7) strength += 1;
    if (password.length > 10) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return (strength / 5) * 100;
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const checkHttps = () => {
    const urlPattern = /^https:\/\/[^ "]+$/;
    setHttpsStatus(urlPattern.test(url) ? 'Este sitio utiliza HTTPS' : 'Este sitio no utiliza HTTPS');
  };

  return (
    <Container maxWidth="lg" className="tips-container">
      <Box className="header-box" sx={{ textAlign: 'center', py: 5 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Consejos de Seguridad Informática
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Aprende a protegerte en línea con estos sencillos consejos.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mt: 5 }}>
        <Grid item xs={12} md={6}>
          <Card className="tip-card">
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Usa Contraseñas Seguras
              </Typography>
              <Typography variant="body1" component="p">
                Utiliza contraseñas largas y complejas que incluyan una combinación de letras mayúsculas y minúsculas, números y símbolos.
                Evita usar la misma contraseña en diferentes sitios.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="tip-card">
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Mantén tu Software Actualizado
              </Typography>
              <Typography variant="body1" component="p">
                Asegúrate de que todos tus dispositivos y aplicaciones tengan instaladas las últimas actualizaciones de seguridad. 
                Las actualizaciones corrigen vulnerabilidades que pueden ser explotadas por los atacantes.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="tip-card">
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Cuidado con los Correos Electrónicos
              </Typography>
              <Typography variant="body1" component="p">
                No abras correos electrónicos de remitentes desconocidos y no hagas clic en enlaces sospechosos. 
                Los correos de phishing pueden parecer legítimos pero están diseñados para robar tu información personal.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="tip-card">
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Usa Autenticación de Dos Factores
              </Typography>
              <Typography variant="body1" component="p">
                Habilita la autenticación de dos factores (2FA) siempre que sea posible. Esto añade una capa extra de seguridad al requerir 
                un segundo paso de verificación además de tu contraseña.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="tip-card">
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Practica la Navegación Segura
              </Typography>
              <Typography variant="body1" component="p">
                Utiliza navegadores seguros y extensiones que bloqueen sitios maliciosos. 
                Verifica que las páginas que visitas utilizan HTTPS para asegurar la transferencia de datos.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="tip-card">
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Cuidado con las Redes Públicas
              </Typography>
              <Typography variant="body1" component="p">
                Evita realizar transacciones sensibles o acceder a información personal desde redes Wi-Fi públicas. 
                Utiliza una VPN para cifrar tu conexión y proteger tus datos cuando estés conectado a redes desconocidas.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box className="additional-tips-box" sx={{ mt: 5, py: 5 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Más Consejos
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Aquí hay algunos consejos adicionales para mantener tu información segura en línea:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1" component="p" gutterBottom>
              <strong>Usa un administrador de contraseñas:</strong> Los administradores de contraseñas pueden ayudarte a crear y gestionar contraseñas seguras para cada uno de tus sitios.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="p" gutterBottom>
              <strong>Realiza copias de seguridad:</strong> Asegúrate de tener copias de seguridad de tus archivos importantes en un lugar seguro, como un disco externo o un servicio de almacenamiento en la nube.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="p" gutterBottom>
              <strong>Protege tu red doméstica:</strong> Cambia las contraseñas predeterminadas de tu router y habilita el cifrado WPA3 para asegurar tu red Wi-Fi.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="p" gutterBottom>
              <strong>Desconfía de las ofertas demasiado buenas:</strong> Si una oferta en línea parece demasiado buena para ser verdad, probablemente lo sea. No caigas en trampas de ofertas fraudulentas.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="p" gutterBottom>
              <strong>Consulta fuentes confiables:</strong> Obtén información y noticias de seguridad informática de fuentes confiables y reconocidas.
            </Typography>
          </li>
        </ul>
      </Box>

      <Box className="useful-tools-box" sx={{ mt: 5, py: 5 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Herramientas Útiles
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Aquí hay algunas herramientas que pueden ayudarte a mantenerte seguro en línea:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1" component="p" gutterBottom>
              <strong>Administrador de Contraseñas:</strong> LastPass, 1Password, Bitwarden.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="p" gutterBottom>
              <strong>Antivirus:</strong> Norton, McAfee, Bitdefender.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="p" gutterBottom>
              <strong>VPN:</strong> NordVPN, ExpressVPN, CyberGhost.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="p" gutterBottom>
              <strong>Extensiones de Navegador:</strong> HTTPS Everywhere, uBlock Origin, Privacy Badger.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="p" gutterBottom>
              <strong>Copias de Seguridad:</strong> Backblaze, Google Drive, Dropbox.
            </Typography>
          </li>
        </ul>
      </Box>

      <Box className="password-checker-box" sx={{ mt: 5, py: 5, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Verifica la Fortaleza de tu Contraseña
        </Typography>
        <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
          <TextField
            label="Introduce tu contraseña"
            variant="outlined"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            sx={{ width: '100%', mb: 2 }}
          />
          <LinearProgress variant="determinate" value={passwordStrength} sx={{ height: 10, borderRadius: 5 }} />
          <Typography variant="body1" component="p" sx={{ mt: 1 }}>
            {passwordStrength < 40 && 'Contraseña débil'}
            {passwordStrength >= 40 && passwordStrength < 70 && 'Contraseña moderada'}
            {passwordStrength >= 70 && 'Contraseña fuerte'}
          </Typography>
        </Box>
      </Box>

      <Box className="https-checker-box" sx={{ mt: 5, py: 5, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Verifica si un Sitio Web usa HTTPS
        </Typography>
        <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
          <TextField
            label="Introduce la URL del sitio web"
            variant="outlined"
            value={url}
            onChange={handleUrlChange}
            sx={{ width: '100%', mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={checkHttps} sx={{ width: '100%', mb: 2 }}>
            Verificar HTTPS
          </Button>
          <Typography variant="body1" component="p">
            {httpsStatus}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Tips;
