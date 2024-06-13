import * as React from 'react';
import { Paper, Typography, Container, TextField, Box, Select, MenuItem, InputLabel, FormControl } from "@mui/material"

const CreateReport = () => {
    const [pretends, setPretends] = React.useState('');

    const handleChange = (event) => {
        setPretends(event.target.value);
    };

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Crear reporte</Typography>

            <Paper elevation={1} square={false}>
                <Box p={3}>
                    <TextField helperText="Url, email, teléfono" required size="medium" variant="outlined" label="Contenido a reportar" />
                    <FormControl  required sx={{ minWidth: '10%', marginLeft: 3 }}>
                        <InputLabel id="demo-simple-select-label">Que simula?</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={pretends}
                            label="¿Que simula?"
                            onChange={handleChange}
                        >
                            <MenuItem value={"Entidad Bancaria"}>Entidad Bancaria</MenuItem>
                            <MenuItem value={"Servicio de Correo"}>Servicio de Correo</MenuItem>
                            <MenuItem value={"Compañía telefónica"}>Compañía telefónica</MenuItem>
                            <MenuItem value={"Ecommerce"}>Ecommerce</MenuItem>
                            <MenuItem value={"Otros"}>Otros</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField helperText="Descripción" required size="medium" variant="outlined" label="Descripción" />
                </Box>
            </Paper>

        </Container>
    )
}

export default CreateReport