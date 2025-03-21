import React, { useState } from 'react';
import { Container, Box, Grid, IconButton, Typography, Modal, useMediaQuery, useTheme, alpha } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import socials from '../data/social-data.json';
import legalMentions from '../data/legal-mentions.json';

const Footer = () => {
  const [openLegal, setOpenLegal] = useState(false);
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSocialClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <section id="reseaux">
    <Box
      component="footer"
      sx={{
        backgroundColor: alpha('#ffffff', 0.2),
        py: 2,
        width: '100%',
        position: 'relative',
      }}
    >
      <Container maxWidth={false} disableGutters>
        <Grid 
          container 
          spacing={1} 
          alignItems="center"
          justifyContent="space-between"
          sx={{
            maxWidth: '100%',
            margin: '0 auto',
            px: {
              xs: 1,
              sm: 2
            }
          }}
        >
          {/* Icônes réseaux sociaux */}
          <Grid item xs={4} sx={{ textAlign: 'left' }}>
            <Box sx={{ display: 'flex' }}>
              {socials.map((social) => (
                <IconButton
                key={social.id}
                onClick={() => handleSocialClick(social.url)}
                sx={{
                  padding: 0.5,
                  '&:hover': {
                    transform: 'scale(1.5)',
                    transition: 'transform 0.3s'
                  },
                  [theme.breakpoints.up('md')]: {
                    padding: 1 // Augmente le padding sur desktop
                  }
                }}
              >
                <Box
                  component="img"
                  src={social.icon}
                  alt={social.name}
                  sx={{
                    width: { xs: 30, md: 40 }, // Taille des icônes : plus petite sur mobile, plus grande sur desktop
                    height: { xs: 30, md: 40 },
                    transition: 'width 0.3s, height 0.3s' // Animation fluide lors du changement de taille
                  }}
                />
              </IconButton>              
              ))}
            </Box>
          </Grid>

          {/* Mentions légales */}
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <Typography
              variant={isTabletOrMobile ? "body2" : "h6"}
              sx={{
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                textDecoration: 'underline',
                '&:hover': {
                  opacity: 0.8
                }
              }}
              onClick={() => setOpenLegal(true)}
            >
              Mentions légales
            </Typography>
          </Grid>

          {/* Copyright */}
          {!isTabletOrMobile && (
            <Grid item xs={4} sx={{ textAlign: 'right', pr: '20px' }}>
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                Live Events® 2025<br />
                <span style={{ fontSize: '0.8rem' }}>Tous droits réservés</span>
              </Typography>
            </Grid>
          )}
        </Grid>

        {/* Mentions légales */}
        <Modal
          open={openLegal}
          onClose={() => setOpenLegal(false)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            maxWidth: 600,
            width: '90%',
            position: 'relative'
          }}>
            <IconButton
              onClick={() => setOpenLegal(false)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" gutterBottom>
              {legalMentions.title}
            </Typography>
            <Typography variant="body2">
              {legalMentions.content}
            </Typography>
          </Box>
        </Modal>
      </Container>
    </Box>
    </section>
  );
};

export default Footer;
