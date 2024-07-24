import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Dialog, DialogContent, DialogActions, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { getEntidades, createEntidad, updateEntidad, deleteEntidad } from '../../api/entidades';
import EntidadForm from './EntidadForm';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './GestionarEntidades.css';

const GestionarEntidades = () => {
  const [entidades, setEntidades] = useState([]);
  const [selectedEntidad, setSelectedEntidad] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEntidades();
  }, []);

  const fetchEntidades = async () => {
    const data = await getEntidades();
    setEntidades(data);
  };

  const handleCreate = async (entidad) => {
    try {
      const response = await createEntidad(entidad);
      if (response.status === 201) {
        Toastify({
          text: 'Entidad creada correctamente',
          duration: 3000,
          close: true,
          gravity: 'top',
          position: 'right',
          style: {
            background: 'green',
          }
        }).showToast()
      }
      else if (response.status === 409) {
        Toastify({
          text: 'Ya existe una entidad con ese nombre',
          duration: 3000,
          close: true,
          gravity: 'top',
          position: 'right',
          style: {
            background: 'red',
          }
        }).showToast()
      }
    } catch (error) {
      console.error(error);
    }
    finally {
      fetchEntidades();
      setOpen(false);
    }

  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "¿Confirmar Acción?",
        text: "Esto eliminará la entidad.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleteEntidad(id);
          try {
            Swal.fire({
              title: "¡Listo!",
              text: "La entidad ha sido eliminada.",
              icon: "success"
            }).then(() => {
              fetchEntidades();
            })
          } catch (e) {
            Toastify({
              text: "Ha habido un error. Por favor, inténtelo de nuevo.",
              style: {
                background: "red",
              },
              duration: "3000",
              close: true,
            }).showToast();
          }

        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      fetchEntidades();
    }
  };

  const handleOpen = () => {
    setSelectedEntidad(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEntidad(null);
  };

  const handleNavigate = (entidad) => {
    navigate(`/gestionarEntidad/${entidad.name}`, {state: {entidad: entidad}});
  };

  return (
    <Container className="container" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Gestionar Entidades
      </Typography>
      <Button variant="contained" onClick={handleOpen} className="button-primary" sx={{ backgroundColor: '#724ae8', color: 'white', '&:hover': { backgroundColor: '#6f5da5' } }}>
        Nueva Entidad
      </Button>
      <Box className="list-container">
        {entidades.length === 0 ? (
          <Typography variant="body1" className="empty-message">
            No hay entidades registradas.
          </Typography>
        ) : (
          <TableContainer component={Paper} className="custom-table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{fontSize: 20, color: 'black'}}>Nombre</TableCell>
                  <TableCell sx={{fontSize: 20}} align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {entidades.map((entidad) => (
                  <TableRow sx={{cursor: 'pointer'}} key={entidad._id} onClick={() => handleNavigate(entidad)}>
                    <TableCell component="th" scope="row">
                      {entidad.name}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleDelete(entidad._id)} color="secondary">
                        <DeleteIcon />
                      </IconButton>
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
          <EntidadForm
            onSubmit={handleCreate}
            entidad={selectedEntidad}
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

export default GestionarEntidades;
