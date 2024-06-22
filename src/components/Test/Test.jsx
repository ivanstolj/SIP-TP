import React, { useState } from 'react';
import { Container, Box, Typography, Paper, Button, RadioGroup, FormControlLabel, Radio, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './Test.css';

const questions = {
  beginner: [
    { question: "¿Qué es una contraseña segura?", options: ["Una contraseña corta", "Una contraseña fácil de recordar", "Una contraseña con letras, números y símbolos", "Una contraseña con tu nombre"], correctAnswer: 2 },
    { question: "¿Qué debes hacer si recibes un correo sospechoso?", options: ["Abrirlo para ver de qué se trata", "Eliminarlo sin abrirlo", "Responder preguntando quién lo envió", "Compartirlo con tus amigos"], correctAnswer: 1 },
    { question: "¿Qué es un antivirus?", options: ["Un programa para ver videos", "Un programa para proteger tu computadora de virus", "Un tipo de correo electrónico", "Un sitio web de noticias"], correctAnswer: 1 },
    { question: "¿Por qué es importante actualizar tus programas?", options: ["Para tener nuevas funciones", "Para protegerte de amenazas de seguridad", "Para gastar más datos", "Para cambiar el diseño"], correctAnswer: 1 },
    { question: "¿Qué significa 'phishing'?", options: ["Pescar en internet", "Un tipo de ataque para robar información personal", "Enviar muchos correos", "Hacer compras en línea"], correctAnswer: 1 },
    { question: "¿Es seguro compartir tu contraseña con amigos?", options: ["Sí, siempre", "No, nunca", "Solo si son amigos cercanos", "Solo en redes sociales"], correctAnswer: 1 },
    { question: "¿Qué es una red Wi-Fi segura?", options: ["Una red abierta sin contraseña", "Una red con contraseña", "Una red en un café", "Una red con el nombre de tu vecino"], correctAnswer: 1 },
    { question: "¿Qué debes hacer si tu computadora se infecta con un virus?", options: ["Ignorarlo", "Intentar eliminarlo con un antivirus", "Compartir el virus", "Reiniciar la computadora"], correctAnswer: 1 },
    { question: "¿Por qué es importante usar una contraseña diferente para cada cuenta?", options: ["Para recordar menos contraseñas", "Para proteger cada cuenta de manera individual", "Para impresionar a tus amigos", "Para evitar tener que cambiar contraseñas"], correctAnswer: 1 },
    { question: "¿Qué debes hacer antes de descargar un archivo adjunto en un correo?", options: ["Abrirlo de inmediato", "Comprobar que el remitente es confiable", "Compartirlo con otros", "Eliminarlo sin verificar"], correctAnswer: 1 },
  ],
  intermediate: [
    { question: "¿Qué es el cifrado de datos?", options: ["Convertir datos en un formato legible", "Proteger datos convirtiéndolos en código", "Eliminar datos viejos", "Guardar datos en la nube"], correctAnswer: 1 },
    { question: "¿Qué es un cortafuegos (firewall)?", options: ["Un antivirus avanzado", "Un sistema de seguridad que controla el tráfico de red", "Un programa para acelerar internet", "Una aplicación de mensajería"], correctAnswer: 1 },
    { question: "¿Qué es la autenticación de dos factores (2FA)?", options: ["Usar dos contraseñas", "Un método de seguridad que requiere dos pasos para verificar identidad", "Guardar la contraseña en dos lugares", "Un tipo de cifrado"], correctAnswer: 1 },
    { question: "¿Qué es el ransomware?", options: ["Un software que acelera la computadora", "Un tipo de malware que bloquea archivos y pide un rescate", "Un programa para limpiar virus", "Un tipo de correo electrónico"], correctAnswer: 1 },
    { question: "¿Qué significa 'VPN'?", options: ["Virtual Private Network", "Very Powerful Network", "Virtual Protection Network", "Verified Private Network"], correctAnswer: 0 },
    { question: "¿Qué es una copia de seguridad (backup)?", options: ["Guardar datos en otro dispositivo o lugar", "Eliminar datos innecesarios", "Cifrar datos sensibles", "Compartir datos en redes sociales"], correctAnswer: 0 },
    { question: "¿Qué es la ingeniería social?", options: ["Un método para crear software", "Manipular a las personas para obtener información confidencial", "Un tipo de ataque físico", "Un sistema de seguridad en redes"], correctAnswer: 1 },
    { question: "¿Qué es un certificado SSL?", options: ["Un documento de identidad", "Un protocolo de seguridad para cifrar datos en sitios web", "Un tipo de virus", "Una aplicación de seguridad"], correctAnswer: 1 },
    { question: "¿Qué es el phishing spear?", options: ["Un ataque de phishing dirigido a una persona o empresa específica", "Un tipo de firewall", "Un software antivirus", "Un método de cifrado de datos"], correctAnswer: 0 },
    { question: "¿Qué es el malvertising?", options: ["Publicidad engañosa en sitios web que distribuye malware", "Un tipo de correo no deseado", "Una aplicación de marketing", "Una técnica para eliminar virus"], correctAnswer: 0 },
  ],
  advanced: [
    { question: "¿Qué es una botnet?", options: ["Una red de bots que realizan tareas automáticas", "Un tipo de virus", "Una red social", "Un sistema operativo"], correctAnswer: 0 },
    { question: "¿Qué es un exploit de día cero?", options: ["Un ataque que se realiza el primer día del mes", "Una vulnerabilidad que se explota antes de que se descubra o se parche", "Un tipo de antivirus", "Un método de cifrado"], correctAnswer: 1 },
    { question: "¿Qué es el sniffing de paquetes?", options: ["Una técnica para interceptar y analizar el tráfico de red", "Un método de cifrado", "Una técnica de ingeniería social", "Un tipo de ransomware"], correctAnswer: 0 },
    { question: "¿Qué es el ataque Man-in-the-Middle?", options: ["Un tipo de phishing", "Una intervención en la comunicación entre dos partes para espiar o alterar los mensajes", "Un tipo de firewall", "Una técnica para crear malware"], correctAnswer: 1 },
    { question: "¿Qué es un ataque DDoS?", options: ["Un ataque que busca denegar el servicio de un sistema, abrumándolo con tráfico de red", "Un tipo de malware", "Una aplicación de seguridad", "Un método de cifrado"], correctAnswer: 0 },
    { question: "¿Qué es un certificado EV SSL?", options: ["Un tipo de certificado SSL con validación extendida para mayor seguridad", "Un tipo de malware", "Un protocolo de seguridad de correo electrónico", "Un método de autenticación"], correctAnswer: 0 },
    { question: "¿Qué es un ataque de fuerza bruta?", options: ["Un método para eliminar virus", "Un ataque que intenta adivinar contraseñas probando muchas combinaciones posibles", "Un tipo de cifrado", "Una técnica de ingeniería social"], correctAnswer: 1 },
    { question: "¿Qué es el hashing?", options: ["Convertir datos en un código de longitud fija", "Cifrar datos", "Eliminar virus", "Crear copias de seguridad"], correctAnswer: 0 },
    { question: "¿Qué es una puerta trasera (backdoor)?", options: ["Un método para evitar la autenticación normal y acceder a un sistema", "Una técnica de marketing", "Un tipo de cifrado", "Un software antivirus"], correctAnswer: 0 },
    { question: "¿Qué es el sandboxing?", options: ["Una técnica para ejecutar programas en un entorno aislado para probar su seguridad", "Una forma de cifrado", "Un tipo de firewall", "Una aplicación de seguridad de redes"], correctAnswer: 0 },
  ],
};

const Quiz = () => {
  const [level, setLevel] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState([]);

  const handleLevelChange = (event) => {
    const selectedLevel = event.target.value;
    setLevel(selectedLevel);
    setCurrentQuestions(questions[selectedLevel].sort(() => 0.5 - Math.random()).slice(0, 10));
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(parseInt(event.target.value, 10));
  };

  const handleNextQuestion = () => {
    if (selectedOption === currentQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <Container maxWidth="md" className="quiz-container">
      <Paper className="quiz-paper" elevation={3}>
        <Typography variant="h4" className="quiz-title">
          Probá tus conocimientos sobre Ciberseguridad
        </Typography>
        {!level ? (
          <Box className="level-selection">
            <Typography variant="h5" gutterBottom>
              Selecciona tu nivel de conocimiento
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="level-select-label">Nivel</InputLabel>
              <Select
                labelId="level-select-label"
                value={level}
                onChange={handleLevelChange}
              >
                <MenuItem value="beginner">Principiante</MenuItem>
                <MenuItem value="intermediate">Intermedio</MenuItem>
                <MenuItem value="advanced">Avanzado</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : !showResult ? (
          <>
            <Typography variant="h5" className="quiz-question">
              {currentQuestions[currentQuestionIndex].question}
            </Typography>
            <RadioGroup value={selectedOption} onChange={handleOptionChange} className="quiz-options">
              {currentQuestions[currentQuestionIndex].options.map((option, index) => (
                <FormControlLabel key={index} value={index} control={<Radio />} label={option} />
              ))}
            </RadioGroup>
            <Button variant="contained" color="primary" onClick={handleNextQuestion} className="quiz-next-button">
              {currentQuestionIndex < currentQuestions.length - 1 ? 'Siguiente' : 'Mostrar Resultados'}
            </Button>
          </>
        ) : (
          <Typography variant="h5" className="quiz-result">
            Has obtenido {score} de {currentQuestions.length} puntos.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Quiz;
