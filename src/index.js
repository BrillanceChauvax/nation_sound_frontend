import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './components/Navbar';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, ThemeProvider, createTheme, CircularProgress, Box } from '@mui/material';
import Background from './components/Background';
import Presentation from './components/Presentation';
import { SocialHighlightProvider } from './components/SocialHighlightContext';

const Billetterie = lazy(() => import('./components/Billetterie'));
const Footer = lazy(() => import('./components/Footer'));
const Programmation = lazy(() => import('./components/Programmation'));
const Artistes = lazy(() => import('./components/Artistes'));
const FAQ = lazy(() => import('./components/FAQ'));
const FestivalMap = lazy(() => import('./components/FestivalMap'));
const Partenaires = lazy(() => import('./components/Partenaires'));

const LoadingComponent = () => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '300px',
    width: '100%'
  }}>
    <CircularProgress color="primary" />
  </Box>
);

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
            <Suspense fallback={<LoadingComponent />}>
            <div id="programme">
              <Programmation />
            </div>
            </Suspense>
            <Suspense fallback={<LoadingComponent />}>
            <div id="concerts">
              <Artistes />
            </div>
            </Suspense> 
            <Suspense fallback={<LoadingComponent />}>
            <div id="billetterie">
              <Billetterie />
            </div>
            </Suspense> 
            <Suspense fallback={<LoadingComponent />}>
            <div id="faq">
              <FAQ />
            </div>
            </Suspense>
            <Suspense fallback={<LoadingComponent />}>
            <div id="carte">
              <FestivalMap />
            </div>
            </Suspense>
            <Suspense fallback={<LoadingComponent />}>
            <div id="partenaires">
              <Partenaires />
            </div>
            </Suspense>
          <Suspense fallback={<LoadingComponent />}>
          <div id="footer">
          <Footer />
          </div>
          </Suspense>
        </Background>
      </SocialHighlightProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();