import { Container, Grid, Typography, Accordion, AccordionSummary, 
  AccordionDetails, alpha } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import faqData from '../data/faq-data.json';

const FAQ = () => {
  return (
    <section id="faq">
      <Container 
        maxWidth={false} 
        disableGutters 
        sx={{ 
          width: '100%', 
          position: 'relative', 
          borderBottom: '3px solid white', 
          padding: '60px 0',
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={11} sm={10} md={8}>
            {/* Titre */}
            <Typography 
              variant="h3" 
              component="h2" 
              align="center" 
              sx={{ 
                color: 'white', 
                mb: 6, 
                fontWeight: 'bold' 
              }}
            >
              Foire aux questions
            </Typography>

            <Grid container spacing={4}>
              {faqData.map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Accordion 
                    sx={{
                      backgroundColor: alpha('#ffffff'),
                      color: 'white',
                      '&:before': {
                        display: 'none',
                      },
                    }}
                  >
                    {/* Composant */}
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
                        aria-controls={`panel${index + 1}-content`}
                        id={`panel${index + 1}-header`}
                        sx={{ color: 'black' }}
                    >
                    <Typography sx={{ fontWeight: 'bold' }}>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ color: 'black' }}>
                      <Typography>{item.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default FAQ;
