import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import './UsuarioForm.css';

const UsuarioForm = ({ onSubmit, usuario, onCancel, dominio }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    rol: 'Colaborador'
  });

  useEffect(() => {
    if (usuario) {
      setFormData({
        name: usuario.name || '',
        lastname: usuario.lastname || '',
        email: usuario.email || '',
        phone: usuario.phone || '',
        password: usuario.password,
        rol: usuario.rol || 'Colaborador'
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper elevation={3} className="form-container">
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        <Typography variant="h6" gutterBottom>
          {usuario ? 'Editar Usuario' : 'Añadir Usuario'}
        </Typography>
        <TextField
          name="name"
          label="Nombre"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="lastname"
          label="Apellido"
          value={formData.lastname}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="email"
          label="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputProps={{
            endAdornment: <Typography variant='body1'>@{dominio}</Typography>,
          }}
        />
        <TextField
          name="phone"
          label="Teléfono"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="password"
          type='password'
          label="Contraseña"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Rol</InputLabel>
          <Select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            label="Rol"
          >
            <MenuItem value="Colaborador">Colaborador</MenuItem>
            <MenuItem value="Administrador">Administrador</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="form-button"
            sx={{ backgroundColor: '#724ae8', '&:hover': { backgroundColor: '#6f5da5' } }}
          >
            {usuario ? 'Guardar Cambios' : 'Añadir Usuario'}
          </Button>
          <Button
            onClick={onCancel}
            variant="contained"
            color="secondary"
            className="form-cancel-button"
            sx={{ backgroundColor: '#dc3545', '&:hover': { backgroundColor: '#c82333' } }}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default UsuarioForm;
