import React from 'react';
import { Container, Button, Grid, Box } from '@mui/material';

const Billetterie = () => {

  return (
    <section id="billetterie">
    <Container 
      maxWidth={false} 
      disableGutters 
      sx={{ 
        width: '100%', 
        position: 'relative', 
        borderBottom: '3px solid white', 
        padding: '80px 0',
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={11} sm={10} md={8}>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              py: { xs: 2, md: 4 }
            }}
          >
            <Button
              variant="contained"
              href="/billetterie" // À modifier quand la page sera créée avec onClick avec useNavigate
              sx={{
                backgroundColor: '#E8DEF8',
                color: 'black',
                fontWeight: 'bold',
                fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                padding: { xs: '12px 40px', sm: '15px 60px', md: '18px 100px' },
                borderRadius: '80px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                letterSpacing: '4px',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                '&:hover': {
                  backgroundColor: 'grey.500',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                },
                '&:active': {
                  transform: 'translateY(1px)',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              Billetterie
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
    </section>
  );
};

export default Billetterie;
