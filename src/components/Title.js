import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Container, alpha } from '@mui/material';
import logoTitre from '../images/fond_title.png';

const Title = () => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    // Date cible: 16 juillet 2025 à minuit
    const targetDate = new Date(2025, 6, 16, 0, 0, 0);
    
    const calculateTimeLeft = () => {
      const difference = targetDate - new Date();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };
    
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <Container 
      maxWidth={false}
      disableGutters
      sx={{
        width: '100%',
        position: 'relative',
        borderBottom: '3px solid white',
        backgroundColor: alpha('#ffffff', 0.2)
      }}
    >
      <Grid 
        container 
        justifyContent="center"
      >
        <Grid item xs={11} sm={10} md={8}>
          <Box 
            sx={{ 
              width: '100%',
              position: 'relative', 
              height: { xs: '400px', sm: '450px', md: '500px' },
              mb: '15px',
              mt: '15px',
              overflow: 'hidden'
            }}
          >
            {/* Texte "Live Events®" en haut à gauche */}
            <Box sx={{ position: 'absolute', top: 0, left: 0 }}>
              <Typography 
                variant="h2" 
                sx={{ 
                  mt: '20px',
                  fontWeight: 700,
                  lineHeight: 1,
                  color: 'white'
                }}
              >
                Live Events<sup>®</sup>
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  marginTop: '5px',
                  color: 'white'
                }}
              >
                présente
              </Typography>
            </Box>
            
            {/* Logo titre au centre, en biais */}
            <Box 
              sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%) rotate(-15deg)', // Rotation pour effet en biais
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxHeight: { xs: '70%', sm: '75%', md: '80%' },
              }}
            >
              <Box 
                component="img"
                src={logoTitre}
                alt="Nation Sound Festival"
                sx={{ 
                    maxWidth: { xs: '85%', sm: '75%', md: '65%' },  
                    maxHeight: { xs: '100%', sm: '100%', md: '100%' },
                    height: 'auto',
                    display: 'block',  
                    margin: '0 auto',  
                  }}
              />
            </Box>
            
            {/* Compte à rebours style calculatrice en bas à droite */}
            <Box 
              sx={{ 
                position: 'absolute', 
                bottom: 0, 
                right: 0,
                padding: '12px 16px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 0, 0, 0.5)',
                boxShadow: '0 0 10px rgba(255, 0, 0, 0.3)',
                mb: '20px'
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                gap: { xs: 1, sm: 2 }
              }}>
                <CountdownUnit value={timeLeft.days} label="JOURS" />
                <CountdownUnit value={timeLeft.hours} label="HEURES" />
                <CountdownUnit value={timeLeft.minutes} label="MIN" />
                <CountdownUnit value={timeLeft.seconds} label="SEC" />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

// Composant pour chaque unité du compte à rebours avec style calculatrice
const CountdownUnit = ({ value, label }) => (
  <Box sx={{ 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center'
  }}>
    <Typography 
      variant="h5" 
      sx={{ 
        color: '#ff0000',
        fontWeight: 700,
        lineHeight: 1,
        fontFamily: "'Courier New', monospace", 
        backgroundColor: 'rgba(20, 20, 20, 0.8)',
        padding: '4px 6px',
        borderRadius: '4px',
        letterSpacing: '1px',
        border: '1px solid rgba(255, 0, 0, 0.3)',
        // Style LCD
        textShadow: '0 0 5px rgba(255, 0, 0, 0.7)',
        fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
      }}
    >
      {value?.toString().padStart(2, '0') || '00'}
    </Typography>
    <Typography 
      variant="caption" 
      sx={{ 
        color: '#ff0000',
        fontSize: '0.6rem',
        marginTop: '2px',
        fontWeight: 500
      }}
    >
      {label}
    </Typography>
  </Box>
);

export default Title;
