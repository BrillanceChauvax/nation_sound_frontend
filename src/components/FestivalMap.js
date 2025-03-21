import React, { useState } from 'react';
import { Container, Grid, Typography, Box, Modal, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FestivalMap = () => {
  const [fullscreen, setFullscreen] = useState(false);
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9914406081603!2d2.2922926156744547!3d48.85837007928754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1621930663349!5m2!1sfr!2sfr";

  const handleOpenFullscreen = () => setFullscreen(true);
  const handleCloseFullscreen = () => setFullscreen(false);

  return (
    <section id="carte">
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
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Box 
              sx={{
                height: '400px',
                width: '100%',
                backgroundColor: 'white',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <iframe 
                src={mapUrl} 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
                title="Carte du festival"
              ></iframe>
            </Box>
            <Button 
              variant="contained" 
              onClick={handleOpenFullscreen}
              sx={{
                backgroundColor: 'white',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'grey.500',
                }
              }}
            >
              Voir la carte en plein écran
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Modal
        open={fullscreen}
        onClose={handleCloseFullscreen}
        aria-labelledby="fullscreen-map"
        aria-describedby="fullscreen-map-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          height: '90%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <Button
            onClick={handleCloseFullscreen}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'black',
            }}
          >
            <CloseIcon />
          </Button>
          <iframe 
            src={mapUrl} 
            width="100%" 
            height="100%" 
            style={{border:0}} 
            allowFullScreen="" 
            loading="lazy"
            title="Carte du festival en plein écran"
          ></iframe>
        </Box>
      </Modal>
    </Container>
    </section>
  );
};

export default FestivalMap;


