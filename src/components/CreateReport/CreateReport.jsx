import React, { useContext, useState } from 'react';
import { Paper, Typography, Container, TextField, Box, Select, MenuItem, InputLabel, FormControl, Button, IconButton, Grid, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';
import ContextoAuth from '../../Context/AuthContext';
import Loader from '../Loader/Loader';
import Swal from 'sweetalert2';

const CreateReport = () => {
  const { user } = useContext(ContextoAuth);
  const [reports, setReports] = useState([{ user: user._id, type: '', content: '', pretends: '', description: '' }]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newReports = [...reports];
    newReports[index][name] = value;
    setReports(newReports);
  };

  const handleAddReport = () => {
    if (reports.length < 5) {
      setReports([...reports, { user: user._id, type: '', content: '', pretends: '', description: '' }]);
    }
  };

  const handleRemoveReport = (index) => {
    const newReports = [...reports];
    newReports.splice(index, 1);
    setReports(newReports);
  };

  const validateContent = (report) => {
    const { type, content } = report;
    let isValid = true;
    let errorMessage = '';

    if (type === 'Email') {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(content)) {
        isValid = false;
        errorMessage = 'Por favor, ingrese un email válido.';
      }
    } else if (type === 'Teléfono') {
      const phoneRegex = /^[0-9]{10,15}$/;
      if (!phoneRegex.test(content)) {
        isValid = false;
        errorMessage = 'Por favor, ingrese un número de teléfono válido.';
      }
    } else if (type === 'URL') {
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!urlRegex.test(content)) {
        isValid = false;
        errorMessage = 'Por favor, ingrese una URL válida.';
      }
    }

    return { isValid, errorMessage };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token').replace(/^"|"$/g, '');
    let allValid = true;
    const newErrors = {};
    const successReports = [];
    const failedReports = [];

    reports.forEach((report, index) => {
      const { isValid, errorMessage } = validateContent(report);
      if (!isValid) {
        allValid = false;
        newErrors[index] = errorMessage;
      }
    });

    setErrors(newErrors);

    if (allValid) {
      for (const report of reports) {
        try {
          const response = await axios.post('http://localhost:4000/reports/create', report, {
            headers: {
              'x-access-token': token
            }
          });
          successReports.push(report);
        } catch (e) {
          console.log(e);
          failedReports.push(report);
        }
      }

      setLoading(false);

      Swal.fire({
        title: 'Resultados del Reporte',
        html: `
          <h3>Reportes Exitosos:</h3>
          <ul>${successReports.map(r => `<li>${r.content} (${r.type})</li>`).join('')}</ul>
          <h3>Reportes Fallidos:</h3>
          <ul>${failedReports.map(r => `<li>${r.content} (${r.type})</li>`).join('')}</ul>
        `,
        icon: 'info'
      });

      setReports([{ user: user._id, type: '', content: '', pretends: '', description: '' }]);
      setErrors({});
    } else {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 4, backgroundColor: '#f5f5f5', padding: 4, borderRadius: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2, color: '#3f51b5' }}>Crear Reporte</Typography>
      <form onSubmit={handleSubmit}>
        {reports.map((report, index) => (
          <Paper key={index} elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
            <Box p={3}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id={`type-label-${index}`}>Tipo de Contenido</InputLabel>
                    <Select
                      labelId={`type-label-${index}`}
                      id={`type-${index}`}
                      name="type"
                      value={report.type}
                      onChange={(event) => handleChange(index, event)}
                      label="Tipo de Contenido"
                    >
                      <MenuItem value="Email">Email</MenuItem>
                      <MenuItem value="Teléfono">Teléfono</MenuItem>
                      <MenuItem value="URL">URL</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="content"
                    helperText={errors[index] || "URL, email, teléfono"}
                    error={!!errors[index]}
                    required
                    variant="outlined"
                    label="Contenido a Reportar"
                    value={report.content}
                    onChange={(event) => handleChange(index, event)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id={`pretends-label-${index}`}>¿Qué Simula?</InputLabel>
                    <Select
                      labelId={`pretends-label-${index}`}
                      id={`pretends-${index}`}
                      name="pretends"
                      value={report.pretends}
                      onChange={(event) => handleChange(index, event)}
                      label="¿Qué Simula?"
                    >
                      <MenuItem value="Entidad Bancaria">Entidad Bancaria</MenuItem>
                      <MenuItem value="Servicio de Correo">Servicio de Correo</MenuItem>
                      <MenuItem value="Compañía telefónica">Compañía telefónica</MenuItem>
                      <MenuItem value="Ecommerce">Ecommerce</MenuItem>
                      <MenuItem value="Otros">Otros</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    required
                    variant="outlined"
                    label="Descripción"
                    multiline
                    rows={4}
                    value={report.description}
                    onChange={(event) => handleChange(index, event)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                  {reports.length > 1 && (
                    <Tooltip title="Eliminar Reporte">
                      <IconButton onClick={() => handleRemoveReport(index)} color="secondary">
                        <RemoveIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {index === reports.length - 1 && reports.length < 5 && (
                    <Tooltip title="Agregar Reporte">
                      <IconButton onClick={handleAddReport} color="primary">
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Paper>
        ))}
        <Button
          sx={{ marginTop: 2, backgroundColor: '#3f51b5', color: 'white', '&:hover': { backgroundColor: '#303f9f' } }}
          type="submit"
          variant="contained"
        >
          Enviar Reporte
        </Button>
      </form>
    </Container>
  );
}

export default CreateReport;
