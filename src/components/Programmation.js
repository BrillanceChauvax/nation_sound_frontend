import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  alpha,
  IconButton,
  CircularProgress,
  Modal,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import eventsData from '../data/events.json';

const Programmation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEnCours, setShowEnCours] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const sliderRef = useRef(null);

  // Chargement des événements
  useEffect(() => {
    setTimeout(() => {
      setEvents(eventsData);
      setLoading(false);
    }, 500);
  }, []);

  // Vérification des concerts en cours
  const isEventEnCours = (event) => {
    const maintenant = new Date();
    const debutEvent = new Date(`${event.date}T${event.heure}`);
    const finEvent = new Date(debutEvent.getTime() + (event.duree) * 3600000); // Durée par défaut : 2 heures
    return maintenant >= debutEvent && maintenant <= finEvent;
  };

  // Tri des événements
  const sortEvents = (events, filter) => {
    if (!filter) return events;
    return [...events].sort((a, b) => {
      switch (filter) {
        case 'date':
          return new Date(a.date) - new Date(b.date);
        case 'heure':
          return a.heure.localeCompare(b.heure);
        case 'lieu':
          return a.lieu.localeCompare(b.lieu);
        case 'catégorie':
          return a.catégorie.localeCompare(b.catégorie);
        default:
          return 0;
      }
    }); 
  };

  const getFilteredEvents = () => {
    let result = [...events];
    
    // Appliquer le filtre actif (date, heure, lieu, catégorie)
    if (activeFilter) {
      result = result.filter(event => event[activeFilter]);
      result = sortEvents(result, activeFilter);
    }
    
    // Appliquer le filtre "événements en cours"
    if (showEnCours) {
      result = result.filter(isEventEnCours);
    }
    
    return result;
  };
  
  // Gestion des filtres
  const handleFilterChange = (value) => {
    setActiveFilter(prev => value === prev ? null : value);
    setShowEnCours(false); // Désactive "Concerts en cours" si un autre filtre est activé
  };

  const goToPrev = () => sliderRef.current?.slickPrev();
  const goToNext = () => sliderRef.current?.slickNext();

  // Configuration du carrousel
  const settings = {
    dots: false,
    infinite: getFilteredEvents().length > 3,
    speed: 500,
    slidesToShow: isMobile ? 2 : 3,
    slidesToScroll: 1,
    rows: 2,
    arrows: false,
    swipeToSlide: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <section id="programme">
      <Container maxWidth={false} disableGutters sx={{ 
        width: '100%',
        position: 'relative',
        borderBottom: '3px solid white',
        paddingTop: '40px'
      }}>
      <Grid container justifyContent="center">
        <Grid item xs={11} sm={10} md={9}>
          {/* Titre avec flèches */}
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: '10px', md: '20px' },
            mb: { xs: '30px', md: '40px' }
          }}>
            <IconButton onClick={goToPrev} sx={{ color: 'white' }}>
              <ArrowBackIcon fontSize="large"/>
            </IconButton>
            
            <Typography variant={isMobile ? "h4" : "h3"} sx={{ 
              color: 'white', 
              fontWeight: 'bold', 
              textAlign: 'center'
            }}>
              Programmation
            </Typography>
            
            <IconButton onClick={goToNext} sx={{ color: 'white' }}>
              <ArrowForwardIcon fontSize="large" />
            </IconButton>
          </Box>

          <Grid container spacing={2}>
            {/* Filtres */}
            <Grid item xs={12} md={3}>
              {(isMobile || isTablet) ? (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                      mb: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      backgroundColor: alpha('#ffffff', 0.4),
                      p: 2,
                      borderRadius: '8px',
                      textTransform: 'uppercase',
                      border: '3px solid white'
                    }}
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    Filtres {showFilters ? '▲' : '▼'}
                  </Typography>
                  <Box sx={{ 
                    maxHeight: showFilters ? '300px' : '0px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease-in-out',
                    backgroundColor: alpha('#ffffff', 0.4),
                    p: showFilters ? 2 : 0,
                    borderRadius: '5px 5px 8px 8px',
                    border: showFilters ? '3px solid white' : '0px solid white',
                    borderTop: 0,
                    mt: -1
                  }}>
                    <RadioGroup value={activeFilter || ''}>
                      {['date', 'heure', 'lieu', 'catégorie'].map((filter) => (
                        <FormControlLabel
                          key={filter}
                          control={<Checkbox 
                            checked={activeFilter === filter}
                            onChange={() => handleFilterChange(filter)}
                            sx={{ color: 'white', '&.Mui-checked': { color: 'white' }}}
                          />}
                          label={<Typography sx={{ color: 'white', textTransform: 'uppercase', fontWeight: 'bold' }}>{filter}</Typography>}
                        />
                      ))}
                    </RadioGroup>
                    <FormControlLabel
                      control={<Checkbox 
                        checked={showEnCours}
                        onChange={(e) => setShowEnCours(e.target.checked)}
                        sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }}
                      />}
                      label={<Typography sx={{ color: 'white', textTransform: 'uppercase', fontWeight: 'bold' }}>évènements en cours</Typography>}
                    />
                  </Box>
                </Box>
              ) : (
                <Box sx={{ 
                  position: 'sticky',
                  top: '20px',
                  backgroundColor: alpha('#ffffff', 0.4),
                  p: '20px',
                  marginBottom: '40px',
                  borderRadius: '10px',
                  border: '3px solid white'
                }}>
                  <Typography variant="h6" sx={{ 
                    color: 'white',
                    fontWeight: 'bold',
                    mb: '15px',
                    textTransform: 'uppercase'
                  }}>
                    Filtres
                  </Typography>
                  
                  <RadioGroup value={activeFilter || ''}>
                    {['date', 'heure', 'lieu', 'catégorie'].map((filter) => (
                      <FormControlLabel
                        key={filter}
                        control={<Checkbox 
                          checked={activeFilter === filter}
                          onChange={() => handleFilterChange(filter)}
                          sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }}
                        />}
                        label={<Typography sx={{ color: 'white', textTransform: 'uppercase', fontWeight: 'bold' }}>{filter}</Typography>}
                      />
                    ))}
                  </RadioGroup>
                  <FormControlLabel
                    control={<Checkbox 
                      checked={showEnCours}
                      onChange={(e) => setShowEnCours(e.target.checked)}
                      sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }}
                    />}
                    label={<Typography sx={{ color: 'white', textTransform: 'uppercase', fontWeight: 'bold' }}>évènements en cours</Typography>}
                  />
                </Box>
              )}
            </Grid>

            {/* Événements */}
            <Grid item xs={12} md={9} sx={{pb: '40px'}}>
              {loading ? (
                <Box sx={{ display:'flex', justifyContent:'center'}}>
                  <CircularProgress sx={{color:'white'}} />
                </Box>
              ) : (
                <Slider ref={sliderRef} {...settings}>
                  {getFilteredEvents().map((event) => (
                    <Box key={event.id}>
                      {/* Vignette événement */}
                      <Box
                        onClick={() => setSelectedEvent(event)}
                        sx={{
                          position:'relative',
                          width:'170px',
                          height:'170px',
                          borderRadius:'50%',
                          border: '3px solid white',
                          overflow:'hidden',
                          margin: 'auto',
                          '&:hover .hover-overlay': {
                            opacity: 1
                          }
                        }}
                      >
                        {/* Image */}
                        <Box component="img" src={event.image} alt={event.title} sx={{
                          width:'100%',
                          height:'100%',
                          objectFit:'cover'
                        }} />
                        {/* Overlay au survol */}
                        <Box
                          className="hover-overlay"
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            bgcolor: 'rgba(0,0,0,0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            transition: 'opacity 0.3s',
                            cursor: 'pointer'
                          }}
                        >
                          <Typography variant="body2" sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                            Cliquez pour plus de détails...
                          </Typography>
                        </Box>
                      </Box>
                      {/* Titre centré */}
                      <Typography variant="h6" sx={{
                        color:'white',
                        textAlign:'center',
                        mt:'10px',
                        mb:'30px'
                      }}>{event.title}</Typography>
                    </Box>
                  ))}
                </Slider>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

        {/* Popup */}
        <Modal open={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
          <Box sx={{
            position:'absolute',
            top:'50%',
            left:'50%',
            transform:'translate(-50%, -50%)',
            width:{ xs:'90%', md:'600px'},
            bgcolor:'#fff',
            borderRadius:'10px',
            p:'20px'
          }}>
            {selectedEvent && (
              <>
                {/* Titre de l'événement */}
                <Typography variant="h4" gutterBottom>{selectedEvent.title}</Typography>
                {/* Image de l'événement */}
                <Box component="img" src={selectedEvent.image} alt={selectedEvent.title} sx={{
                  width:'100%',
                  borderRadius:'10px',
                  mb:'20px'
                }} />
                {/* Description et détails */}
                <Typography variant="body1">{selectedEvent.description}</Typography>
                <Grid container spacing={2} mt="10px">
                  <Grid item xs={6}>
                    <Typography>📅 {selectedEvent.date}</Typography>
                    <Typography>⏰ {selectedEvent.heure}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>📍 {selectedEvent.lieu}</Typography>
                  </Grid>
                </Grid>

                {/* Bouton de fermeture */}
                <IconButton onClick={() => setSelectedEvent(null)} sx={{
                  position:'absolute',
                  top:'10px',
                  right:'10px'
                }}>
                  <CloseIcon />
                </IconButton>
              </>
            )}
          </Box>
        </Modal>
      </Container>
    </section>
  );
};

export default Programmation;
