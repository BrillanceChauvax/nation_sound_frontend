import React, { useRef } from 'react';
import { Box, Typography, Container, useTheme, useMediaQuery, Grid } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import artistesData from '../data/artistes.json';

const Artistes = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const sliderRef = useRef(null);

  // Configuration du carrousel
  const settings = {
    dots: false,
    infinite: true,
    speed: 4000,
    slidesToShow: isMobile ? 2 : isTablet ? 2 : 3,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false, 
    variableWidth: false,
    autoplay: true, 
    autoplaySpeed: 10,
    pauseOnHover: false
  };

  return (
    <section id="concerts">
      <Container 
        maxWidth={false} 
        disableGutters 
        sx={{ 
          width: '100%', 
          position: 'relative', 
          borderBottom: '3px solid white', 
          padding: '40px 0',
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                mb: 4 
              }}
            >
              <Typography 
                variant={isMobile ? "h4" : "h3"} 
                sx={{ 
                  color: 'white', 
                  fontWeight: 700, 
                  mx: 3, 
                  textAlign: 'center' 
                }}
              >
                Artistes
              </Typography>
            </Box>
              <Box sx={{ width: '100%' }}>
                    <Box 
                      sx={{ 
                        overflow: 'hidden',
                        width: '100%',
                        '& .slick-track': {
                          display: 'flex',
                          justifyContent: 'space-between',
                        },
                        '& .slick-slide': {
                          display: 'flex', 
                          justifyContent: 'center',
                          minHeight: 'auto',
                        }
                      }}
                    >
                {/* Carrousel des artistes */}      
                <Slider ref={sliderRef} {...settings}>
                    {artistesData.map((artiste, index) => (
                    <Box 
                      key={artiste.id} 
                      sx={{ 
                        padding: { xs: 1, sm: 1.5, md: 2 },
                        display: 'flex', 
                        justifyContent: 'center' 
                      }}
                    >
                      <Box
                        component="img"
                        src={process.env.PUBLIC_URL + artiste.image}
                        alt={artiste.name}
                        sx={{
                          width: { xs: '160px', sm: '180px', md: '200px' },
                          height: { xs: '160px', sm: '180px', md: '200px' },
                          borderRadius: '50%',
                          border: '3px solid white',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Slider>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Artistes;
