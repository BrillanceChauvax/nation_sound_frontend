import React from 'react';
import { Box } from '@mui/material';
import fondSite from '../images/fond_site.avif'

const Background = ({ children }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        '&::before': {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0
        },
        backgroundImage: `url(${fondSite})`,
        backgroundColor: '#000000', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Background;
