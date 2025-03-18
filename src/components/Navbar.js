import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, 
  ListItemText, Box, ButtonGroup, useMediaQuery, useTheme, alpha } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../images/logo.png';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navbarHeight = 96;
  
  const menuItems = [
    'Programme',
    'Concerts',
    'Billetterie',
    'FAQ',
    'Carte',
    'Partenaires',
    'Réseaux'
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
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
          // Mobile layout / Version mobile
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
                height: 80,
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
                  {menuItems.map((text) => (
                    <ListItem 
                      button 
                      key={text}
                      onClick={toggleDrawer} 
                      sx={{ 
                        justifyContent: 'center',
                        margin: '10px 0',
                        width: '80%',
                        borderRadius: '8px',
                        border: '2px solid white',
                        backgroundColor: alpha('#E8DEF8', 0.5),
                        '&:hover': {
                          backgroundColor: alpha('#E8DEF8', 0.8),
                        },
                        transition: 'background-color 0.3s'
                      }}
                    >
                      <ListItemText 
                        primary={text} 
                        primaryTypographyProps={{
                          sx: { 
                            color: '#000000',
                            fontSize: '25px',
                            fontWeight: 800,
                            textAlign: 'center',
                            padding: '8px 0'
                          }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          // Desktop layout (reste inchangé)
          <>
            <Box
              component="img"
              sx={{ 
                height: 100,
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
            
            <ButtonGroup variant="contained" 
            aria-label="navigation buttons"
            spacing={2}  
            buttonFlex="1 1 auto"  
            sx={{ 
              '--ButtonGroup-separatorColor': '#ffffff',  
              '& .MuiButtonGroup-grouped:not(:last-of-type)': {borderColor: '#ffffff'},
              width: '100%',  
              justifyContent: 'space-between', 
              mr: 4,
              }}
            >
              {menuItems.map((item, index) => (
                <Button 
                  key={item}
                  sx={{ 
                    backgroundColor: '#E8DEF8',
                    '&:hover': {
                      backgroundColor: 'grey.500',
                    },
                    color: '#000000',
                    flex: 1, 
                    minWidth: 0, 
                  }}
                >
                  {item}
                </Button>
              ))}
            </ButtonGroup>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
