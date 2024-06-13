import * as React from 'react';
import { Paper, Typography, Container, TextField, Box, Select, MenuItem, InputLabel, FormControl, Button, IconButton, Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CreateReport = () => {
  const [reports, setReports] = React.useState([{ pretends: '', content: '', description: '' }]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newReports = [...reports];
    newReports[index][name] = value;
    setReports(newReports);
  };

  const handleAddReport = () => {
    if (reports.length < 5) {
      setReports([...reports, { pretends: '', content: '', description: '' }]);
    }
  };

  const handleRemoveReport = (index) => {
    const newReports = [...reports];
    newReports.splice(index, 1);
    setReports(newReports);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(reports)
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Crear Reporte</Typography>
      <form onSubmit={handleSubmit}>
        {reports.map((report, index) => (
          <Paper key={index} elevation={1} sx={{ padding: 3, marginBottom: 2 }}>
            <Box p={3}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="content"
                    helperText="URL, email, teléfono"
                    required
                    size="medium"
                    variant="outlined"
                    label="Contenido a Reportar"
                    value={report.content}
                    onChange={(event) => handleChange(index, event)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ minWidth: '100%', marginBottom: 2 }} required>
                    <InputLabel id={`pretends-label-${index}`}>¿Qué Simula?</InputLabel>
                    <Select
                      labelId={`pretends-label-${index}`}
                      id={`pretends-${index}`}
                      name="pretends"
                      value={report.pretends}
                      onChange={(event) => handleChange(index, event)}
                      label="¿Qué Simula?"
                      fullWidth
                    >
                      <MenuItem value={"Entidad Bancaria"}>Entidad Bancaria</MenuItem>
                      <MenuItem value={"Servicio de Correo"}>Servicio de Correo</MenuItem>
                      <MenuItem value={"Compañía telefónica"}>Compañía telefónica</MenuItem>
                      <MenuItem value={"Ecommerce"}>Ecommerce</MenuItem>
                      <MenuItem value={"Otros"}>Otros</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    sx={{ minWidth: '100%' }}
                    helperText="Descripción"
                    required
                    size="medium"
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
                    <IconButton onClick={() => handleRemoveReport(index)} color="secondary">
                      <RemoveIcon />
                    </IconButton>
                  )}
                  {index === reports.length - 1 && reports.length < 5 && (
                    <IconButton onClick={handleAddReport} color="primary">
                      <AddIcon />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Paper>
        ))}
        <Button
          sx={{ marginTop: 2 }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Enviar Reporte
        </Button>
      </form>
    </Container>
  );
}

export default CreateReport;
