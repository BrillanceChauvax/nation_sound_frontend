import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, 
  ListItemText, Box, useMediaQuery, useTheme, alpha, useScrollTrigger } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../images/logo.avif';
import { useSocialHighlight } from './SocialHighlightContext';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navbarHeightMobile = 70;
  const navbarHeightDesktop = 96;
  const { triggerHighlight } = useSocialHighlight();
  const [scrolled, setScrolled] = useState(false);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  useEffect(() => {
    setScrolled(trigger);
  }, [trigger]);
  
  const menuItems = [
    { name: 'Programme', id: 'programme', title: 'Programme du festival', ariaLabel: 'Accéder au programme' },
    { name: 'Artistes', id: 'concerts', title: 'Liste des artistes', ariaLabel: 'Découvrir les artistes' },
    { name: 'Billetterie', id: 'billetterie', title: 'Accès à la billetterie', ariaLabel: 'Accéder à la billetterie' },
    { name: 'FAQ', id: 'faq', alt: 'Foire Aux Questions', title: 'Foire aux questions', ariaLabel: 'Découvrir la FAQ' },
    { name: 'Carte', id: 'carte', alt: 'Carte interactive', title: 'Carte interactive', ariaLabel: 'Accéder à la carte' },
    { name: 'Partenaires', id: 'partenaires', alt: 'Partenaires', title: 'Liste des partenaires', ariaLabel: 'Découvrir les partenaires' },
    { name: 'Réseaux', id: 'reseaux', alt: 'Réseaux Sociaux', title: 'Nos réseaux sociaux', ariaLabel: 'Découvrir nos pages de réseaux sociaux', isSocial: true }
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const scrollConfig = {
    smooth: true,
    duration: 500,
    offset: isMobile ? -navbarHeightMobile : -navbarHeightDesktop,
  };

  return (
    <>
        <AppBar 
          position="fixed"
          sx={{
            backgroundColor: scrolled ? alpha('#ffffff', 0.8) : alpha('#ffffff', 0.2),
            transition: 'background-color 0.3s ease',
            borderBottom: '3px solid white',
            zIndex: theme.zIndex.drawer + 1,
            height: isMobile ? navbarHeightMobile : navbarHeightDesktop,
          }}
        >
          <Toolbar sx={{ justifyContent: isMobile ? 'space-between' : 'flex-start' }}>
            {isMobile ? (
              <>
                {/* Icone menu burger */}  
                <IconButton
                  edge="start"
                  aria-label="menu"
                  onClick={toggleDrawer} 
                  sx={{
                    border: scrolled ? `2px solid black` : `2px solid white`,
                    color: scrolled ? `black` : `white`,
                    borderRadius: '50%', 
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 1)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <MenuIcon />
                </IconButton>
                {/* Logo Mobile qui au clic recharge la page */}
                <h1 style={{ margin: 0 }}>
                  <a href="/" title="Accueil" aria-label="Retour à l'accueil">
                    <Box
                      component="img"
                      sx={{ 
                        height: 50,
                        cursor: 'pointer',
                        mt: 1,
                        mb: 1,
                      }}
                      alt="Nation Sound"
                      src={logo}
                      onClick={() => window.location.href = '/'}
                    />
                  </a>
                </h1>
                {/* Affichage menu burger */}  
                <Drawer
                  anchor="top"
                  open={drawerOpen}
                  onClose={toggleDrawer}
                  PaperProps={{
                    sx: {
                      backgroundColor: alpha('#E8DEF8', 0.2),
                      marginTop: isMobile ? `${navbarHeightMobile}px` : `${navbarHeightDesktop}px`,
                      maxHeight: isMobile 
                        ? `calc(100% - ${navbarHeightMobile + 3}px)`
                        : `calc(100% - ${navbarHeightDesktop + 3}px)`,
                      width: '100%',
                      padding: '15px 0 25px 0',
                    }
                  }}
                  ModalProps={{
                    container: document.body,
                    style: { position: 'absolute' }
                  }}
                >
                  <Box
                    sx={{ 
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      padding: 2,
                    }}
                  >
                    <List sx={{ 
                      width: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      padding: 0
                    }}>
                      {/* Mappage des boutons version mobile*/}
                      {menuItems.map((item) => (
                        <ScrollLink key={item.id} 
                        to={item.id} 
                        {...scrollConfig}
                        href={`${item.id}`} 
                        title={item.title}
                        aria-label={item.ariaLabel}
                        style={{ textDecoration: 'none'}}
                        >
                          <ListItem 
                            button 
                            onClick={toggleDrawer} 
                            sx={{ 
                              justifyContent: 'center',
                              textTransform: 'uppercase',
                              cursor: 'pointer',
                              margin: '8px auto',
                              width: '280px',
                              height: '60px',
                              borderRadius: '8px',
                              border: '2px solid white',
                              backgroundColor: alpha('#E8DEF8', 0.9),
                              '&:hover': {
                                backgroundColor: ('grey.500'),
                              },
                              transition: 'background-color 0.3s',
                              flexShrink: 0
                            }}
                          >
                          <ListItemText 
                            primary={item.name} 
                            primaryTypographyProps={{
                              sx: { 
                                color: '#000000',
                                fontSize: '22px',
                                fontWeight: 800,
                                textAlign: 'center',
                                padding: '8px 0',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }
                            }}
                          />
                          </ListItem>
                        </ScrollLink>
                      ))}
                    </List>
                  </Box>
                </Drawer>
              </>
            ) : (
              <>
                {/* Logo Desktop qui au clic recharge la page */}
                <h1 style={{ margin: 0 }}>
                  <a href="/" title="Accueil" aria-label="Retour à l'accueil">
                    <Box
                      component="img"
                      sx={{ 
                        height: 70,
                        mr: 6,
                        ml: 2,
                        mb: 1,
                        mt: 1,
                        cursor: 'pointer'
                      }}
                      alt="Nation Sound"
                      src={logo}
                      onClick={() => window.location.href = '/'}
                    />
                  </a>
                </h1>
                {/* Navbar Desktop */}  
                <Box sx={{ 
                   display: 'flex',
                  width: '100%',
                  '& .MuiButton-root': {
                  flex: '1 1 0%', 
                  minWidth: 0, 
                  backgroundColor: '#E8DEF8',
                  borderRadius: 2, 
                  border: '1px solid black', 
                  '&:last-child': {
                  },
                  '&:hover': { backgroundColor: 'grey.500' },
                  color: '#000000',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  transition: 'all 0.3s',
                  fontSize: 'clamp(12px, 1.5vw, 16px)', 
                  padding: '5px 5px', 
                  }
                  }}>
                  {/* Mappage des boutons version desktop */}
                  {menuItems.map((item) => (
                    <ScrollLink key={item.id} 
                    to={item.id} 
                    {...scrollConfig} 
                    href={`${item.id}`} 
                    title={item.title}
                    aria-label={item.ariaLabel}
                    style={{flex: '1 1 0%'}}
                    onClick={() => item.id === 'reseaux' && triggerHighlight()}
                    >
                    <Button fullWidth>{item.name}</Button>
                    </ScrollLink>
                  ))}
                </Box>
              </>
            )}
          </Toolbar>
        </AppBar>
      <Toolbar sx={{ height: isMobile ? navbarHeightMobile : navbarHeightDesktop }}/>
    </>
  );
};

export default Navbar;
