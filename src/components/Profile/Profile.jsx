import ContextoAuth from '../../Context/AuthContext';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Avatar, Button, TextField, Box } from '@mui/material';
import { orange } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import './Profile.css';

const UserProfile = () => {
  const { user, logOffUser } = useContext(ContextoAuth);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState({ ...user });
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (user) {
      setAvatarUrl(`https://robohash.org/${user.username}.png`);
    }
  }, [user]);

  const handlelogOffUser = () => {
    logOffUser();
    navigate("/");
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditableUser({ ...user });
    }
  };

  const handleChange = (e) => {
    setEditableUser({ ...editableUser, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = () => {
    // Save changes to user profile (e.g., send to server)
    setIsEditing(false);
  };

  if (!user || Object.keys(user).length === 0) {
    return <Typography variant="h6">Cargando...</Typography>;
  }

  return (
    <Container className="user-profile-container" maxWidth="md">
      <Box className="user-profile-box" boxShadow={3} padding={3}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4} className="avatar-grid">
            <Avatar
              alt={user.name}
              src={avatarUrl}
              className="user-avatar"
              sx={{ bgcolor: orange[500], width: 120, height: 120 }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" className="user-name">
              {editableUser.name} {editableUser.lastname}
            </Typography>
            <Typography variant="body1" className="user-email">
              {editableUser.username}
            </Typography>
            <Typography variant="body1" className="user-email">
              {editableUser.email}
            </Typography>
            <Typography variant="body1" className="user-phone">
              {editableUser.phone}
            </Typography>
            <Button
              variant="contained"
              startIcon={isEditing ? <CancelIcon /> : <EditIcon />}
              className="edit-profile-button"
              sx={{ backgroundColor: isEditing ? '#f44336' : '#007bff', color: 'white', marginTop: 2, '&:hover': { backgroundColor: isEditing ? '#d32f2f' : '#0056b3' } }}
              onClick={handleEditClick}
            >
              {isEditing ? "Dejar de Editar" : "Editar Perfil"}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box className="user-profile-edit-box" boxShadow={3} padding={3} marginTop={3}>
        <Typography variant="h5" className="edit-profile-title" sx={{ marginBottom: '5%' }}>
          Editar Información del Perfil
        </Typography>
        <form className="edit-profile-form">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                variant="outlined"
                name="name"
                value={editableUser.name}
                onChange={handleChange}
                className="profile-input"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Apellido"
                variant="outlined"
                name="lastname"
                value={editableUser.lastname}
                onChange={handleChange}
                className="profile-input"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Correo Electrónico"
                variant="outlined"
                name="email"
                value={editableUser.email}
                onChange={handleChange}
                className="profile-input"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              {isEditing && (
                <Button
                  variant="contained"
                  color="primary"
                  className="save-profile-button"
                  sx={{ backgroundColor: '#007bff', '&:hover': { backgroundColor: '#0056b3' } }}
                  onClick={handleSaveChanges}
                  startIcon={<SaveIcon />}
                >
                  Guardar Cambios
                </Button>
              )}
              <Button
                variant="contained"
                color="error"
                className="save-profile-button"
                sx={{ marginLeft: isEditing ? '5%' : 0, marginTop: isEditing ? 0 : 2 }}
                onClick={handlelogOffUser}
              >
                Cerrar Sesión
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default UserProfile;
