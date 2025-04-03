import React from 'react';
import { Box } from '@mui/material';
import fondSite from '../images/fond_site.jpg'

const Background = ({ children }) => {
  return (
    <Box
      sx={{
        width: '100%', 
        minHeight: '100vh',
        position: 'relative',
        backgroundImage: `url(${fondSite})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden', 
      }}
    >
      {children}
    </Box>
  );
};

export default Background;