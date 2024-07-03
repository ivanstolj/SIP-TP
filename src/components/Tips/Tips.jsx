import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import './Tips.css';

function Tips() {
  const [words, setWords] = useState(['', '', '']);
  const [numCount, setNumCount] = useState(0);
  const [specialCharCount, setSpecialCharCount] = useState(0);
  const [useNumbers, setUseNumbers] = useState(false);
  const [useSpecialChars, setUseSpecialChars] = useState(false);
  const [generatedPasswords, setGeneratedPasswords] = useState([]);

  const handleWordsChange = (index, event) => {
    const newWords = [...words];
    newWords[index] = event.target.value;
    setWords(newWords);
  };

  const handleGeneratePasswords = () => {
    const filteredWords = words.filter(word => word.length > 0);
    const passwords = [];
    for (let i = 0; i < 3; i++) {
      passwords.push(generatePassword(filteredWords, useNumbers ? numCount : 0, useSpecialChars ? specialCharCount : 0));
    }
    setGeneratedPasswords(passwords);
  };

  const generatePassword = (words, numCount, specialCharCount) => {
    const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);
    const getRandomInt = (max) => Math.floor(Math.random() * max);
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
    const specialChars = "!#$%^&*_+|;:,.?";

    let shuffledWords = shuffleArray(words.map(capitalize));

    // Add special characters between words or at the end
    for (let i = 0; i < specialCharCount; i++) {
      const randomSpecialChar = specialChars.charAt(getRandomInt(specialChars.length));
      const insertPosition = getRandomInt(shuffledWords.length + 1); // Position to insert special char
      if (insertPosition === shuffledWords.length) {
        shuffledWords.push(randomSpecialChar);
      } else {
        shuffledWords.splice(insertPosition, 0, randomSpecialChar);
      }
    }

    let password = shuffledWords.join('');

    // Add numbers at the end
    const addNumbers = (password, numCount) => {
      for (let i = 0; i < numCount; i++) {
        password += getRandomInt(10);
      }
      return password;
    };

    if (numCount > 0) password = addNumbers(password, numCount);

    return password;
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

      <Box className="password-generator-box" sx={{ mt: 5, py: 5, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Generador de Contraseñas Seguras
        </Typography>
        <Grid container spacing={2} sx={{ maxWidth: 600, mx: 'auto', textAlign: 'left' }}>
          {words.map((word, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <TextField
                label={`Palabra ${index + 1}`}
                variant="outlined"
                value={word}
                onChange={(event) => handleWordsChange(index, event)}
                fullWidth
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={useNumbers} onChange={() => setUseNumbers(!useNumbers)} />}
              label="Usar números"
            />
          </Grid>
          {useNumbers && (
            <Grid item xs={12}>
              <TextField
                label="Cantidad de números"
                variant="outlined"
                type="number"
                value={numCount}
                onChange={(event) => setNumCount(parseInt(event.target.value))}
                fullWidth
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={useSpecialChars} onChange={() => setUseSpecialChars(!useSpecialChars)} />}
              label="Usar caracteres especiales"
            />
          </Grid>
          {useSpecialChars && (
            <Grid item xs={12}>
              <TextField
                label="Cantidad de caracteres especiales"
                variant="outlined"
                type="number"
                value={specialCharCount}
                onChange={(event) => setSpecialCharCount(parseInt(event.target.value))}
                fullWidth
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleGeneratePasswords} fullWidth sx={{ backgroundColor: '#724ae8', color: 'white', '&:hover': { backgroundColor: '#6f5da5' } }}>
              Generar Contraseñas
            </Button>
          </Grid>
          {generatedPasswords.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h6" component="p" gutterBottom>
                Contraseñas Generadas:
              </Typography>
              <ul>
                {generatedPasswords.map((password, index) => (
                  <li key={index}>
                    <Typography variant="body1" component="p">
                      {password}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default Tips;
