import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import ContextoAuth from '../../Context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ProtectedRoute = ({ redirectTo }) => {
    const { isLogged, loading } = useContext(ContextoAuth);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return isLogged ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
