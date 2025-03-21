import React, { useRef } from 'react';
import { Box, Typography, IconButton, Container, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Partenaires = () => {
  const sliderRef = useRef(null);
  const images = Array(10).fill(null); // Simulation de 10 partenaires

  // Configuration optimisée avec défilement infini
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: false,
    swipeToSlide: true,
    centerMode: true,
    centerPadding: '0px',
    autoplay: true,
    autoplaySpeed: 1800,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  // Contrôle manuel du carrousel
  const goToPrev = () => sliderRef.current?.slickPrev();
  const goToNext = () => sliderRef.current?.slickNext();

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
            <IconButton 
              onClick={goToPrev} 
              sx={{ 
                position: 'absolute', 
                left: { xs: -20, sm: -30 }, 
                top: '50%', 
                transform: 'translateY(-50%)', 
                zIndex: 2,
                color: 'white'
              }}
            >
              <ArrowBackIcon fontSize="large" />
            </IconButton>

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
                    {/* À remplacer par les logos WordPress */}
                    <Typography>Logo {index + 1}</Typography>
                  </Box>
                </Box>
              ))}
            </Slider>

            <IconButton 
              onClick={goToNext} 
              sx={{ 
                position: 'absolute', 
                right: { xs: -20, sm: -30 }, 
                top: '50%', 
                transform: 'translateY(-50%)', 
                zIndex: 2,
                color: 'white'
              }}
            >
              <ArrowForwardIcon fontSize="large" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Container>
    </section>
  );
};

export default Partenaires;
