import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Box, Container, Typography, Button, Dialog, DialogContent, DialogActions, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUsuarios, addUsuario, deleteUsuario, updateUsuarioRole } from '../../api/usuarios';
import UsuarioForm from './UsuarioForm';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import Swal from 'sweetalert2';
import './GestionarEntidad.css';
import ContextoAuth from '../../Context/AuthContext';

const GestionarEntidad = () => {
  const { state } = useLocation();
  const { user } = useContext(ContextoAuth)
  const { nombre } = useParams();
  const [usuarios, setUsuarios] = useState([]);
  console.log(usuarios)
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchUsuarios();
  }, [nombre]);

  const fetchUsuarios = async () => {
    const data = await getUsuarios(state.entidad);
    setUsuarios(data);
  };

  const handleAdd = async (usuario) => {
    usuario = { ...usuario, company: nombre, email: `${usuario.email}@${state.domain}` };
    console.log(usuario)
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
          const response = await deleteUsuario(nombre, id);
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
      const response = await updateUsuarioRole(nombre, id, newRole);
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

  return (
    <Container className="container" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Gestionar Usuarios de Entidad "{nombre}"
      </Typography>
      <Button variant="contained" onClick={handleOpen} className="button-primary" sx={{ backgroundColor: '#724ae8', color: 'white', '&:hover': { backgroundColor: '#6f5da5' } }}>
        Añadir Usuario
      </Button>
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
                              <MenuItem value="administrator">administrator</MenuItem>
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
      <Dialog open={open} onClose={handleClose} className="dialog">
        <DialogContent className="dialog-content">
          <UsuarioForm
            onSubmit={handleAdd}
            usuario={selectedUsuario}
            dominio={state.domain}
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

export default GestionarEntidad;
