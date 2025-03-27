import React, { useState, useEffect } from 'react';
import { Container, Box, Grid, IconButton, Typography, Modal, useMediaQuery, useTheme, alpha } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import socials from '../data/social-data.json';
import legalMentions from '../data/legal-mentions.json';
import { useSocialHighlight } from './SocialHighlightContext';

const Footer = () => {
  const [openLegal, setOpenLegal] = useState(false);
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'));
  const handleSocialClick = (url) => {
    window.open(url, '_blank');
  };
  const { highlight } = useSocialHighlight();
  const [localHighlight, setLocalHighlight] = useState(false);

  useEffect(() => {
    if (highlight) {
      setLocalHighlight(true);
      const timer = setTimeout(() => setLocalHighlight(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [highlight]);

  return (
    <section id="reseaux">
    <Box
      component="footer"
      sx={{
        backgroundColor: alpha('#ffffff', 0.2),
        py: 2,
        position: 'relative',
      }}
    >
      <Container maxWidth={false} disableGutters>
        <Grid 
          container 
          spacing={0} 
          alignItems="center"
          justifyContent="space-between"
          sx={{
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
                  transform: localHighlight ? 'scale(1.2)' : 'scale(1)',
                  backgroundColor: localHighlight ? 'rgb(255, 213, 0)' : 'transparent',
                  borderRadius: '50%',
                  '&:hover': {
                    transform: 'scale(1.5)',
                    transition: 'transform 0.3s'
                  },
                  [theme.breakpoints.up('md')]: {
                    padding: 1
                  }
                }}
              >
                <Box
                  component="img"
                  src={social.icon}
                  alt={social.name}
                  sx={{
                    width: { xs: 35, md: 40 }, 
                    height: { xs: 35, md: 40 },
                    transition: 'width 0.3s, height 0.3s', 
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
            <Typography variant="h6" gutterBottom
              sx={{
                textAlign: 'center',
                marginBottom: '20px', 
                fontWeight: 'bold', 
                textTransform: 'uppercase',
              }}
            >
              {legalMentions.title}
            </Typography>
            <Typography variant="body2"
            sx={{
                lineHeight: 1,
              }}
            >
              {legalMentions.content.map((paragraph, index) => (
                <React.Fragment key={index}>
                  {paragraph}
                  <br /><br />
                </React.Fragment>
              ))}
            </Typography>
          </Box>
        </Modal>
      </Container>
    </Box>
    </section>
  );
};

export default Footer;
