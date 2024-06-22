import React, { useState, useContext, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper, Grid, Pagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import ContextoAuth from '../../Context/AuthContext';
import { ToastContainer, toast, Zoom, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Whitelist.css';

const ITEMS_PER_PAGE = 10;

const WhitelistManagement = () => {
    const { user, updateUser } = useContext(ContextoAuth);
    const [whitelist, setWhitelist] = useState([]);
    const [newWhitelistItem, setNewWhitelistItem] = useState('');
    const [isEditing, setIsEditing] = useState(null);
    const [editedItem, setEditedItem] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (user && user.whitelist) {
            setWhitelist(user.whitelist);
        }
    }, [user]);

    const handleAddToWhitelist = () => {
        if (newWhitelistItem && !whitelist.includes(newWhitelistItem)) {
            setWhitelist([...whitelist, newWhitelistItem]);
            setNewWhitelistItem('');
        }
    };

    const handleRemoveFromWhitelist = (index) => {
        const newWhitelist = [...whitelist];
        newWhitelist.splice(index, 1);
        setWhitelist(newWhitelist);
    };

    const handleEditItemClick = (index) => {
        setIsEditing(index);
        setEditedItem(whitelist[index]);
    };

    const handleSaveItemClick = (index) => {
        const newWhitelist = [...whitelist];
        newWhitelist[index] = editedItem;
        setWhitelist(newWhitelist);
        setIsEditing(null);
        setEditedItem('');
    };

    const handleCancelEdit = () => {
        setIsEditing(null);
        setEditedItem('');
    };

    const handleSaveWhitelist = async () => {
        const content = {
            userId: user._id,
            content: whitelist
        }

        try {
            const token = localStorage.getItem('token').replace(/^"|"$/g, '');
            await axios.put('http://localhost:4000/users/whitelist', { content }, {
                headers: {
                    'x-access-token': token
                }
            });
            user.whitelist = whitelist;
            updateUser(user);
            toast.success('¡Whitelist actualizada!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
                transition: Zoom,
            });
        } catch (e){
            console.log(e);
            toast.error('No se pudo actualizar la whitelist');
        }

    };

    const filteredWhitelist = whitelist.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
    const paginatedWhitelist = filteredWhitelist.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const totalPages = Math.ceil(filteredWhitelist.length / ITEMS_PER_PAGE);

    return (
        <Container maxWidth="md" className="whitelist-container">
            <ToastContainer />
            <Typography variant="h4" className="whitelist-title" gutterBottom>
                Administrar Whitelist
            </Typography>
            <Paper className="whitelist-paper" elevation={3}>
                <Box className="whitelist-box" padding={3}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={9}>
                            <TextField
                                fullWidth
                                label="Add to Whitelist"
                                variant="outlined"
                                value={newWhitelistItem}
                                onChange={(e) => setNewWhitelistItem(e.target.value)}
                                className="whitelist-input"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={handleAddToWhitelist}
                                fullWidth
                                className="whitelist-add-button"
                            >
                                Añadir
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Search"
                                variant="outlined"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="whitelist-search-input"
                                InputProps={{
                                    startAdornment: <SearchIcon position="start" />
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box className="whitelist-items-box" padding={3}>
                    <List className="whitelist">
                        {paginatedWhitelist.map((item, index) => (
                            <ListItem key={index} className="whitelist-item">
                                {isEditing === index ? (
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={editedItem}
                                        onChange={(e) => setEditedItem(e.target.value)}
                                        className="whitelist-edit-input"
                                    />
                                ) : (
                                    <ListItemText primary={item} className="whitelist-item-text" />
                                )}
                                <ListItemSecondaryAction>
                                    {isEditing === index ? (
                                        <>
                                            <IconButton edge="end" aria-label="save" onClick={() => handleSaveItemClick(index)} className="whitelist-save-icon">
                                                <SaveIcon />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="cancel" onClick={handleCancelEdit} className="whitelist-cancel-icon">
                                                <CancelIcon />
                                            </IconButton>
                                        </>
                                    ) : (
                                        <>
                                            <IconButton edge="end" aria-label="edit" onClick={() => handleEditItemClick(index)} className="whitelist-edit-icon">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromWhitelist(index)} className="whitelist-delete-icon">
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(event, value) => setCurrentPage(value)}
                        color="primary"
                        className="whitelist-pagination"
                    />
                </Box>
                <Box className="whitelist-save-box" padding={3} textAlign="center">
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={handleSaveWhitelist}
                        className="whitelist-save-button"
                    >
                        Save Whitelist
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default WhitelistManagement;
