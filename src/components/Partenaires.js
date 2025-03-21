import React, { useState, useRef } from 'react';
import { Box, Typography, Container, Grid, Button, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Partenaires = () => {
  const sliderRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const images = Array(10).fill(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: false,
    swipe: false, // Désactive le glissement tactile
    swipeToSlide: false, // Désactive le glissement
    centerMode: true,
    centerPadding: '0px',
    autoplay: true,
    autoplaySpeed: 1800,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          swipe: false // Désactive aussi sur les breakpoints
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          swipe: false // Désactive aussi sur les breakpoints
        }
      }
    ]
  };

  // Supprimer les fonctions de contrôle manuel
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <section id="partenaires">
      <Container 
        maxWidth={false} 
        disableGutters 
        sx={{ 
          width: '100%', 
          position: 'relative', 
          borderBottom: '3px solid white', 
          padding: '30px 0',
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
                mb: 6, 
                fontWeight: 'bold' 
              }}
            >
              Nos Partenaires
            </Typography>

            {/* Supprimer les IconButton des flèches */}
            <Box sx={{ position: 'relative' }}>
              <Slider ref={sliderRef} {...settings}>
                {images.map((_, index) => (
                  <Box 
                    key={index}
                    sx={{
                      padding: '0 15px',
                      height: '150px',
                      display: 'flex!important',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#E8DEF8',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      <Typography>Logo {index + 1}</Typography>
                    </Box>
                  </Box>
                ))}
              </Slider>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 3 }}>
              <Button 
                variant="contained" 
                onClick={handleOpenModal}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '5px',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: 'grey.500',
                  }
                }}
              >
                Voir tous les partenaires
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 800,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 2,
        }}>
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
            Tous nos partenaires
          </Typography>
          <Grid container spacing={2}>
            {images.map((_, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Box
                  sx={{
                    backgroundColor: '#E8DEF8',
                    borderRadius: '20px',
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2
                  }}
                >
                  <Typography align="center">Logo {index + 1}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>
    </section>
  );
};

export default Partenaires;
