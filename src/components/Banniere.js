import React from 'react';
import { Box } from '@mui/material';
import logo from '../images/logo.png';
import fondBanniere from '../images/fond_banniere.jpg';

const Banniere = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: {
          xs: '300px', 
          sm: '400px',
          md: '500px',
        },
        position: 'relative',
        backgroundImage: `url(${fondBanniere})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: '3px solid white',
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="Logo du site"
        sx={{
          height: {
            xs: '250px',
            sm: '350px',
            md: '450px',
          },
          width: 'auto',
          transition: 'transform 0.3s ease-in-out',
        }}
      />
    </Box>
  );
};

export default Banniere;
