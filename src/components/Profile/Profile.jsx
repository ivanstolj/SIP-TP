import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Avatar, Button, Box, Badge, Chip } from '@mui/material';
import { orange, green } from '@mui/material/colors';
import ContextoAuth from '../../Context/AuthContext';
import StarIcon from '@mui/icons-material/Star';
import './Profile.css';

const UserProfile = () => {
  const { user, logOffUser } = useContext(ContextoAuth);
  const navigate = useNavigate();
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

  if (!user || Object.keys(user).length === 0) {
    return <Typography variant="h6">Cargando...</Typography>;
  }

  return (
    <Container className="user-profile-container" maxWidth="md">
      <Box className="user-profile-box" boxShadow={3} padding={3}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4} className="avatar-grid">
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                user.premium ? (
                  <Chip
                    icon={<StarIcon />}
                    label="Premium"
                    color="primary"
                    className="premium-chip"
                    sx={{ backgroundColor: green[500], color: 'white' }}
                  />
                ) : null
              }
            >
              <Avatar
                alt={user.name}
                src={avatarUrl}
                className="user-avatar"
                sx={{ bgcolor: orange[500], width: 120, height: 120 }}
              />
            </Badge>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" className="user-name">
              {user.name} {user.lastname}
            </Typography>
            <Typography variant="body1" className="user-username">
              @{user.username}
            </Typography>
            <Typography variant="body1" className="user-email">
              {user.email}
            </Typography>
            <Typography variant="body1" className="user-phone">
              {user.phone}
            </Typography>
            <Button
              variant="contained"
              color="error"
              className="logout-button"
              sx={{ marginTop: 2 }}
              onClick={handlelogOffUser}
            >
              Cerrar Sesión
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UserProfile;
