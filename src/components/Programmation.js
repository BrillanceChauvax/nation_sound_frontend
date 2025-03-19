import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Container, Typography, Grid, Checkbox, FormControlLabel,
  RadioGroup, alpha, IconButton, CircularProgress, 
  useTheme, useMediaQuery, FormControl
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Programmation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallDesktop = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(null);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 2 : isTablet ? 2 : isSmallDesktop ? 2 : 3,
    slidesToScroll: 1,
    rows: 2,
    arrows: false,
    swipeToSlide: true,
    waitForAnimate: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const mockData = Array.from({ length: 12 }, (_, i) => ({
          id: i + 1,
          title: `Événement ${i + 1}`,
          image: `https://source.unsplash.com/random/300x300?concert&sig=${i}`,
          date: `2025-07-${16 + Math.floor(i/4)}`,
          heure: `${18 + (i % 6)}:00`,
          lieu: `Scène ${(i % 3) + 1}`,
          type: ['Rock', 'Jazz', 'Électro', 'Hip-hop'][i % 4],
          description: `Description détaillée de l'événement ${i + 1}. Cliquez pour plus d'informations sur cet artiste incroyable.`
        }));
        
        setTimeout(() => {
          setEvents(mockData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Erreur lors du chargement des événements:", error);
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setActiveFilter(prevActiveFilter => value === prevActiveFilter ? null : value);
  };

  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <Container 
      maxWidth={false}
      disableGutters
      sx={{
        width: '100%',
        position: 'relative',
        borderBottom: '3px solid white',
        padding: '20px 0',
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={11} sm={10} md={8}>
          {/* Titre et boutons de navigation */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
              mb: 4
            }}
          >
            <IconButton 
              onClick={goToPrev} 
              sx={{ 
                color: 'white',
                '& .MuiSvgIcon-root': {
                  fontSize: '2.5rem'
                }
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            
            {/* Titre h3 pour desktop, h4 pour mobile */}
            <Typography 
              variant={isMobile ? "h4" : "h3"} 
              component={isMobile ? "h4" : "h3"}
              sx={{ 
                color: 'white', 
                fontWeight: 700,
                mx: 3,
                textAlign: 'center'
              }}
            >
              Programmation
            </Typography>
            
            <IconButton 
              onClick={goToNext} 
              sx={{ 
                color: 'white',
                '& .MuiSvgIcon-root': {
                  fontSize: '2.5rem'
                }
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>

          <Grid container>
            <Grid item xs={4} md={3} sx={{ display: 'flex', alignItems: 'center',
                    backgroundColor: alpha('#ffffff', 0.1), 
                    borderRadius: '12px', 
                    border: '2px solid white', 
                    padding: 4,
                    mb: '20px'
             }}>
              <Box sx={{ width: '100%' }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'white',
                    mb: 2,
                    fontWeight: 600,
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                  }}
                >
                  Filtres
                </Typography>
                
                <FormControl component="fieldset">
                  <RadioGroup 
                    value={activeFilter || ''} 
                    onChange={handleFilterChange}
                  >
                    {[
                      { value: 'date', label: 'Date' },
                      { value: 'heure', label: 'Heure' },
                      { value: 'lieu', label: 'Lieu' },
                      { value: 'type', label: 'Type de concert' }
                    ].map((filter) => (
                      <FormControlLabel
                        key={filter.value}
                        value={filter.value}
                        control={
                            <Checkbox 
                            checked={activeFilter === filter.value}
                            onChange={() => {
                              if (activeFilter === filter.value) {
                                setActiveFilter(null);
                              } else {
                                setActiveFilter(filter.value);
                              }
                            }} 
                            sx={{ 
                              color: 'white',
                              '&.Mui-checked': {
                                color: 'white',
                              },
                            }}
                          />
                        }
                        label={
                          <Typography sx={{ 
                            color: 'white',
                            fontSize: { xs: '0.85rem', md: '1.1rem' },
                          }}>
                            {filter.label}
                          </Typography>
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
            </Grid>
            
            <Grid item xs={8} md={9}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
                  <CircularProgress sx={{ color: 'white' }} />
                </Box>
              ) : (
                <Slider ref={sliderRef} {...settings}>
                  {events.map((event) => (
                    <Box key={event.id} sx={{ padding: '10px' }}>
                      <EventVignette event={event} />
                    </Box>
                  ))}
                </Slider>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

// Vignette modifiée pour garantir la rondeur parfaite et une meilleure taille sur mobile
const EventVignette = ({ event }) => {
    const [hover, setHover] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
      <Box
        sx={{
          position: 'relative',
          margin: 'auto',
          width: { xs: '120px', sm: '150px', md: '180px' },
          height: { xs: '120px', sm: '150px', md: '180px' },
          borderRadius: '50%',
          border: '3px solid white',
          overflow: 'hidden',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center',
          aspectRatio: '1 / 1',
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setHover(!hover)}
      >
        {/* Image de fond */}
        <Box
          component="img"
          src={event.image}
          alt={event.title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        
        {/* Overlay avec fond blanc et texte centré */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: hover ? alpha('#ffffff', 0.8) : 'transparent',
            transition: 'background-color 0.3s ease-in-out',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: isMobile ? '8px' : '10px', 
            overflow: 'hidden',
          }}
        >
          {hover ? (
            // Contenu en survol/clic
            <>
              <Typography
                variant="subtitle1"
                sx={{
                  color: '#000',
                  fontWeight: 700,
                  textAlign: 'center',
                  mb: 0.5, 
                  fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1rem' } 
                }}
              >
                {event.title}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#000', 
                  textAlign: 'center',
                  fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' } 
                }}
              >
                {event.date} • {event.heure}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#000', 
                  textAlign: 'center',
                  fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' } 
                }}
              >
                {event.lieu} • {event.type}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#000', 
                  mt: 0.5, 
                  textAlign: 'center',
                  display: '-webkit-box',
                  WebkitLineClamp: isMobile ? 2 : 3, // 2 lignes sur mobile, 3 sur desktop
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  maxWidth: '90%',
                  fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } 
                }}
              >
                {event.description}
              </Typography>
            </>
          ) : (
            // Contenu sans survol/clic
            <Typography
              variant="subtitle1"
              sx={{
                position: 'absolute',
                bottom: '15%',
                width: '100%',
                color: '#fff',
                fontWeight: 700,
                textAlign: 'center',
                textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1rem' } // Adapté
              }}
            >
              {event.title}
            </Typography>
          )}
        </Box>
      </Box>
    );
};

export default Programmation;
