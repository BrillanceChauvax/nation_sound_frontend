import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, 
  ListItemText, Box, useMediaQuery, useTheme, alpha } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../images/logo.png';
import { useSocialHighlight } from './SocialHighlightContext';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navbarHeight = 96;
  const { triggerHighlight } = useSocialHighlight();
  
  const menuItems = [
    { name: 'Programme', id: 'programme' },
    { name: 'Concerts', id: 'concerts' },
    { name: 'Billetterie', id: 'billetterie' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Carte', id: 'carte' },
    { name: 'Partenaires', id: 'partenaires' },
    { name: 'Réseaux', id: 'reseaux', isSocial: true }
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const scrollConfig = {
    smooth: true,
    duration: 500,
  };

  return (
    <AppBar 
      position="static"
      sx={{
        backgroundColor: alpha('#ffffff', 0.2),
        boxShadow: 'none',
        borderBottom: '3px solid white',
      }}
    >
      <Toolbar sx={{ justifyContent: isMobile ? 'space-between' : 'flex-start' }}>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer} 
            >
              <MenuIcon />
            </IconButton>
            
            <Box
              component="img"
              sx={{ 
                height: 60,
                cursor: 'pointer',
                mt: 1,
                mb: 1,
              }}
              alt="Logo du site"
              src={logo}
              onClick={() => window.location.href = '/'}
            />
            
            <Drawer
              anchor="top"
              open={drawerOpen}
              onClose={toggleDrawer}
              PaperProps={{
                sx: {
                  backgroundColor: alpha('#E8DEF8', 0.2),
                  marginTop: `${navbarHeight + 3}px`, 
                  maxHeight: `calc(100% - ${navbarHeight + 3}px)`,
                  width: '100%',
                  padding: '15px 0 25px 0',
                }
              }}
              ModalProps={{
                container: document.body,
                style: { position: 'absolute' }
              }}
              variant="temporary"
              sx={{
                '& .MuiBackdrop-root': {
                  marginTop: `${navbarHeight + 3}px`,
                },
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
                  {menuItems.map((item) => (
                    <ScrollLink key={item.id} to={item.id} {...scrollConfig}>
                      <ListItem 
                        button 
                        onClick={toggleDrawer} 
                        sx={{ 
                          justifyContent: 'center',
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
            <Box
              component="img"
              sx={{ 
                height: 90,
                mr: 6,
                ml: 2,
                mb: 1,
                mt: 1,
                cursor: 'pointer'
              }}
              alt="Logo du site"
              src={logo}
              onClick={() => window.location.href = '/'}
            />
            
            <Box sx={{ 
              display: 'flex',
              width: '100%',
              '& .MuiButton-root': {
                flex: '1 1 0%', 
                minWidth: 0, 
                backgroundColor: '#E8DEF8',
                borderRadius: 1, 
                border: '1px solid black', 
                '&:last-child': {
                  borderRight: 'none', 
                },
                '&:hover': { backgroundColor: 'grey.500' },
                color: '#000000',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                transition: 'all 0.3s',
                fontSize: 'clamp(12px, 1.5vw, 16px)', 
                padding: '8px 4px', 
              }
              }}>
              {menuItems.map((item) => (
                <ScrollLink key={item.id} to={item.id} {...scrollConfig} style={{flex: '1 1 0%'}}
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
  );
};

export default Navbar;
