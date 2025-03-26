import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Container, Grid, Button, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import partnersData from '../data/partners-data.json';

const Partenaires = () => {
  const sliderRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    setPartners(partnersData);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: false,
    swipe: false, 
    swipeToSlide: false, 
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
          swipe: false 
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          swipe: false 
        }
      }
    ]
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  /*Permet de regrouper les partenaires par genre*/
  const groupedPartners = partners.reduce((acc, partner) => {
    if (!acc[partner.gender]) {
      acc[partner.gender] = [];
    }
    acc[partner.gender].push(partner);
    return acc;
  }, {});

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
            <Box sx={{ position: 'relative' }}>
              <Slider ref={sliderRef} {...settings}>
                {partners.map((partner) => (
                  <Box 
                    key={partner.id}
                    sx={{
                      padding: '0 15px',
                      height: '150px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        position: 'relative',
                        aspectRatio: '1', 
                        padding: '20px' 
                      }}
                    >
                      <img 
                        src={partner.logo} 
                        alt={partner.name} 
                        style={{ 
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }} 
                      />
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
      {/*Box pour montrer tous les partenaires*/}
        <Box sx={{
          position: 'relative',
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
          <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom
            sx={{
              textAlign: 'center',
              marginBottom: '20px', 
              fontWeight: 'bold', 
              textTransform: 'uppercase',
            }}
          >
            Tous nos partenaires
          </Typography>
          {Object.entries(groupedPartners).map(([gender, genderPartners]) => (
          <Box key={gender} mb={4}>
            <Typography variant="h6" gutterBottom>
              {gender}
            </Typography>
            <Grid container spacing={2}>
              {genderPartners.map((partner) => (
                <Grid item xs={6} sm={4} md={3} key={partner.id}>
                  <Box
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '20px',
                      height: 140,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 2,
                      border: '3px solid black',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    <img src={partner.logo} alt={partner.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </Modal>
    </section>
  );
};

export default Partenaires;
