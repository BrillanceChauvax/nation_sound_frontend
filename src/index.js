import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './components/Navbar';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Background from './components/Background';
import Presentation from './components/Presentation';
import Programmation from './components/Programmation';
import Artistes from './components/Artistes';
import Billetterie from './components/Billetterie';
import FAQ from './components/FAQ'
import FestivalMap from './components/FestivalMap'
import Partenaires from './components/Partenaires'
import Footer from './components/Footer'
import { SocialHighlightProvider } from './components/SocialHighlightContext';

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SocialHighlightProvider>
        <Background>
          <Navbar />
            <Presentation />
            <Programmation />
            <Artistes />
            <Billetterie />
            <FAQ />
            <FestivalMap />
            <Partenaires />
          <Footer />
        </Background>
      </SocialHighlightProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();