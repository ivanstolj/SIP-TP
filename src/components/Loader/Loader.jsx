// src/components/Loader.js
import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import './Loader.css';

const Loader = () => {
  return (
    <Box className="loader-container">
      <CircularProgress size={60} />
    </Box>
  );
};

export default Loader;
