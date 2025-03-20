import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';

const FestivalMap = () => {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9914406081603!2d2.2922926156744547!3d48.85837007928754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1621930663349!5m2!1sfr!2sfr";

  return (
    <Container 
      maxWidth={false} 
      disableGutters 
      sx={{ 
        width: '100%', 
        position: 'relative', 
        borderBottom: '3px solid white', 
        padding: '60px 0',
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={11} sm={10} md={8}>
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            sx={{ 
              color: 'white', 
              mb: 4, 
              fontWeight: 'bold' 
            }}
          >
            Carte du Festival
          </Typography>
          <Box 
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '500px',
              width: '100%',
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
          >
            <iframe 
                src={mapUrl} 
                width="100%" 
                height="100%" 
                title="Carte interactive du festival" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
                ></iframe>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FestivalMap;
