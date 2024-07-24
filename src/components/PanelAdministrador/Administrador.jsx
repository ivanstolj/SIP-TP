import React, { useState, useEffect, useContext } from 'react';
import { Box, Container, Typography, Button, Dialog, DialogContent, DialogActions, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUsuarios, addUsuario, deleteUsuario, updateUsuarioRole, getReportesByCompany } from '../../api/usuarios';
import UsuarioForm from '../GestionarEntidad/UsuarioForm';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import Swal from 'sweetalert2';
import './Administrador.css';
import ContextoAuth from '../../Context/AuthContext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PanelAdministrador = () => {
    const { user } = useContext(ContextoAuth)
    const company = user.company
    const [usuarios, setUsuarios] = useState([]);
    const [reportes, setReportes] = useState([]);
    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [open, setOpen] = useState(false);
    const [view, setView] = useState('table'); // Estado para controlar la vista actual

    useEffect(() => {
        fetchUsuarios();
        fetchReportes();
    }, [company]);

    const fetchUsuarios = async () => {
        const data = await getUsuarios(company);
        setUsuarios(data);
    };

    const fetchReportes = async () => {
        const data = await getReportesByCompany(company);
        console.log("DATA",data)
        setReportes(data);
    };

    const handleAdd = async (usuario) => {
        usuario = { ...usuario, company: company._id, email: `${usuario.email}@${company.domain}` };
        try {
            const response = await addUsuario(usuario);
            Toastify({
                text: 'Usuario añadido correctamente',
                duration: 3000,
                close: true,
                gravity: 'top',
                position: 'right',
                style: {
                    background: 'green',
                }
            }).showToast();
        } catch (error) {
            console.error(error);
        } finally {
            fetchUsuarios();
            setOpen(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: "¿Confirmar Acción?",
                text: "Esto eliminará el usuario.",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await deleteUsuario(id);
                    Swal.fire({
                        title: "¡Listo!",
                        text: "El usuario ha sido eliminado.",
                        icon: "success"
                    }).then(() => {
                        fetchUsuarios();
                    })
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleRoleChange = async (id, newRole) => {
        try {
            const response = await updateUsuarioRole(id, newRole);
            Toastify({
                text: 'Rol actualizado correctamente',
                duration: 3000,
                close: true,
                gravity: 'top',
                position: 'right',
                style: {
                    background: 'green',
                }
            }).showToast();
        } catch (error) {
            console.error(error);
        } finally {
            fetchUsuarios();
        }
    };

    const handleOpen = () => {
        setSelectedUsuario(null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUsuario(null);
    };

    const getReportesCountByUsuario = (email) => {
        return reportes.filter(reporte => reporte.user.email === email).length;
    };

    const toggleView = () => {
        setView((prevView) => (prevView === 'table' ? 'analytics' : 'table'));
    };

    // Datos para los gráficos
    const reportesPorTipo = reportes.reduce((acc, reporte) => {
        acc[reporte.type] = (acc[reporte.type] || 0) + 1;
        return acc;
    }, {});

    const reportesPorPretende = reportes.reduce((acc, reporte) => {
        acc[reporte.pretends] = (acc[reporte.pretends] || 0) + 1;
        return acc;
    }, {});

    const reportesPorUsuario = usuarios.reduce((acc, usuario) => {
        acc[usuario.name] = getReportesCountByUsuario(usuario.email);
        return acc;
    }, {});

    const dataReportesPorTipo = {
        labels: Object.keys(reportesPorTipo),
        datasets: [{
            label: 'Reportes por Tipo',
            data: Object.values(reportesPorTipo),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }]
    };

    const dataReportesPorPretende = {
        labels: Object.keys(reportesPorPretende),
        datasets: [{
            label: 'Reportes por Pretende Ser',
            data: Object.values(reportesPorPretende),
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
        }]
    };

    const dataReportesPorUsuario = {
        labels: Object.keys(reportesPorUsuario),
        datasets: [{
            label: 'Reportes por Usuario',
            data: Object.values(reportesPorUsuario),
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
        }]
    };

    return (
        <Container className="container" sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                ¡Bienvenido, administrador de "{company.name}"!
            </Typography>
            <Button variant="contained" onClick={handleOpen} className="button-primary" sx={{ backgroundColor: '#724ae8', color: 'white', '&:hover': { backgroundColor: '#6f5da5' } }}>
                Añadir Usuario
            </Button>
            <Button variant="contained" onClick={toggleView} className="button-secondary" sx={{ ml: 2, backgroundColor: '#e91e63', color: 'white', '&:hover': { backgroundColor: '#ad1457' } }}>
                {view === 'table' ? 'Ver Análisis' : 'Ver Usuarios'}
            </Button>
            {view === 'table' ? (
                <Box className="list-container">
                    {usuarios.length === 0 ? (
                        <Typography variant="body1" className="empty-message">
                            No hay usuarios en esta entidad.
                        </Typography>
                    ) : (
                        <TableContainer component={Paper} className="custom-table-container">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Correo</TableCell>
                                        <TableCell>Rol</TableCell>
                                        <TableCell>Reportes</TableCell>
                                        <TableCell align="right">Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {usuarios.map((usuario) => (
                                        <TableRow key={usuario._id}>
                                            <TableCell component="th" scope="row">
                                                {usuario.name}
                                            </TableCell>
                                            <TableCell>{usuario.email}</TableCell>
                                            <TableCell>
                                                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                                                    <InputLabel>Rol</InputLabel>
                                                    {
                                                        usuario.email === user.email ?
                                                            <Select
                                                                disabled
                                                                value={usuario.rol}
                                                                onChange={(e) => handleRoleChange(usuario._id, e.target.value)}
                                                                label="Rol"
                                                            >
                                                                <MenuItem value="Colaborador">Colaborador</MenuItem>
                                                                <MenuItem value="Administrador">Administrador</MenuItem>
                                                            </Select>
                                                            :
                                                            <Select
                                                                value={usuario.rol}
                                                                onChange={(e) => handleRoleChange(usuario._id, e.target.value)}
                                                                label="Rol"
                                                            >
                                                                <MenuItem value="Colaborador">Colaborador</MenuItem>
                                                                <MenuItem value="Administrador">Administrador</MenuItem>
                                                            </Select>
                                                    }
                                                </FormControl>
                                            </TableCell>
                                            <TableCell>
                                                {getReportesCountByUsuario(usuario.email)}
                                            </TableCell>
                                            <TableCell align="right">
                                                {
                                                    usuario.email === user.email ? null :
                                                        <IconButton onClick={() => handleDelete(usuario._id)} color="error">
                                                            <DeleteIcon />
                                                        </IconButton>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            ) : (
                <Box className="analytics-container">
                    <Typography variant="h5" gutterBottom>
                        Análisis de Reportes
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Reportes por Tipo
                                </Typography>
                                <Bar data={dataReportesPorTipo} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Reportes por Pretende Ser
                                </Typography>
                                <Bar data={dataReportesPorPretende} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Reportes por Usuario
                                </Typography>
                                <Bar data={dataReportesPorUsuario} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            )}
            <Dialog open={open} onClose={handleClose} className="dialog">
                <DialogContent className="dialog-content">
                    <UsuarioForm
                        onSubmit={handleAdd}
                        usuario={selectedUsuario}
                        dominio={company.domain}
                        onCancel={handleClose}
                        className="form-container"
                    />
                </DialogContent>
                <DialogActions className="dialog-actions">
                    <Button onClick={handleClose} color="primary" className="dialog-button">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default PanelAdministrador;
