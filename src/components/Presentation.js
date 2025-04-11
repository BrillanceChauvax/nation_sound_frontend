import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import logo from '../images/logo.avif';
import fondBanniere from '../images/fond_banniere.avif';
import fondBanniereMobile from '../images/fond_banniere_mobile.avif';

// Initialisation du compteur
const Presentation = () => {
  const [timeLeft, setTimeLeft] = useState({});
  
  const targetDate = useMemo(() => new Date(2025, 6, 16, 13, 0, 0), []);
  
  const calculateTimeLeft = useCallback(() => {
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
  }, [targetDate]);
  
  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [calculateTimeLeft]); 
  

  const CountdownUnit = ({ value, label }) => (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      p: 1
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
          textShadow: '0 0 5px rgba(255, 0, 0, 0.7)',
          fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' }
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

  return (
    <Box
      sx={{
        width: '100%',
        height: {
          xs: 'calc(100vh - 56px)',
          sm: 'calc(100vh - 94px)',
        },
        position: 'relative',
        backgroundImage: {
          xs: `url(${fondBanniereMobile})`,
          sm: `url(${fondBanniere})`,
        },
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderBottom: '3px solid white', 

      }}
    >
      {/* Texte "Live Events présente" */}
      <Box sx={{ position: 'absolute', top: '20px', left: '20px', color: 'white' }}>
        <Typography 
          variant="h3" 
          component="h1"
          sx={{ 
            fontWeight: 700,
            lineHeight: 1,
            textShadow: '0 0 8px rgba(0,0,0,0.8), 0 0 12px rgba(0,0,0,0.6)',
          }}
        >
          Live Events<sup>®</sup>
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            marginTop: '5px',
            textShadow: '0 0 8px rgba(0,0,0,0.8), 0 0 12px rgba(0,0,0,0.6)',
          }}
        >
          présente
        </Typography>
      </Box>

      {/* Logo principal */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo du site"
          sx={{
            height: {
              xs: '350px',
              sm: '450px',
              md: '500px',
            },
          }}
        />
      </Box>

      {/* Compteur */}
      <Box 
      sx={{ 
        position: 'absolute',
        bottom: '8px',
        right: '20px',
        display: 'flex',  
        flexDirection: 'column', 
        justifyContent: 'center',  
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '8px',
        padding: '5px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'
      }}
    >
      <Typography 
        variant="body1" 
        sx={{ 
          color: 'white',
          fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
          fontWeight: 'bold',
          marginBottom: '10px',
          fontFamily: "'Courier New', monospace",
        }}
      >
        du 16 au 18 juillet 2025
      </Typography>
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
  );
};

export default Presentation;

