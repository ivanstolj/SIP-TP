import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import './GestionarEntidades.css';
const EntidadForm = ({ onSubmit, entidad, onCancel }) => {
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');

  useEffect(() => {
    if (entidad) {
      setName(entidad.nombre);
    }
  }, [entidad]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, domain });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>{entidad ? 'Editar Entidad' : 'Nueva Entidad'}</Typography>
      <TextField
        label="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Dominio"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" sx={{ mr:2,backgroundColor: '#724ae8', color: 'white', '&:hover': { backgroundColor: '#6f5da5' } }} >
         Crear Entidad
      </Button>
      {onCancel && (
        <Button variant="contained" sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: 'darkred' } }} onClick={onCancel}>
          Cancelar
        </Button>
      )}
    </Box>
  );
};

export default EntidadForm;
