import React from 'react';
import { Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './GestionarEntidades.css';

const EntidadList = ({ entidades, onEdit, onDelete }) => {
  return (
    <Box className="list-container">
      <List>
        {entidades.map((entidad) => (
          <ListItem key={entidad._id} className="list-item">
            <ListItemText primary={entidad.nombre} className="list-item-text" />
            <ListItemSecondaryAction className="list-item-actions">
              <IconButton edge="end" aria-label="edit" onClick={() => onEdit(entidad)} className="icon-button">
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => onDelete(entidad._id)} className="icon-button delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EntidadList;
