# Nation Sound Festival - Frontend

## 🇬🇧 ENGLISH DOCUMENTATION (FRENCH BELOW)

### 🚀 Technologies Used

**Core Technologies:**
- **React 19.0.0** - Latest React for component-based UI development
- **React DOM 19.0.0** - DOM rendering library
- **Material-UI (MUI) 6.4.12** - React component library with Material Design
- **React Router DOM 7.6.2** - Client-side routing for SPA navigation

**UI & Styling:**
- **@emotion/react & @emotion/styled 11.14.0** - CSS-in-JS styling solution
- **@mui/icons-material 6.4.12** - Material Design icons
- **React Slick 0.30.3** - Carousel component for artists/events
- **Slick Carousel 1.8.1** - CSS/JS for carousel functionality

**Interactive Features:**
- **Leaflet 1.9.4** - Open-source mapping library
- **React Leaflet 5.0.0** - React components for Leaflet maps
- **React Scroll 1.9.3** - Smooth scrolling navigation

**Development & Testing:**
- **React Scripts 5.0.1** - Build tools and development server
- **Testing Library suite** - React component testing utilities
- **Web Vitals 2.1.4** - Performance monitoring

### 🏗️ Project Architecture

#### Component Structure
- **Core Components:** `index.js`, `Navbar.js`, `Background.js`, `Presentation.js`, `Footer.js`
- **Feature Components:** `Programmation.js`, `Artistes.js`, `FestivalMap.js`
                          `Billetterie.js`, `FAQ.js`, `Partenaires.js`

#### Performance Optimizations
- **Code Splitting:** React.lazy() for non-critical components
- **Asset Optimization:** AVIF images, responsive loading
- **State Management:** React hooks, LocalStorage

### 📱 Responsive Design
- **Mobile:** `< 600px` (hamburger menu, touch-optimized)
- **Tablet:** `600px - 900px` (adaptive layout)
- **Desktop:** `> 900px` (full navigation, multi-column)

### 🔧 Progressive Web App Features
- Real-time countdown timer
- Interactive map with geolocation

### 🛠️ Installation & Configuration

#### Quick Start
```
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

#### File Structure
```
src/
├── components/         # React components
├── images/             # Image assets
├── data/               # Static data (JSON)
├── index.js            # Main component
└── reportWebVitals.js  # Performance metrics
```

### 📋 Features Overview

#### 🎵 Core Features
- **Hero Section** with real-time countdown
- **Artist Carousel** 
- **Event Programming** with filtering and modals
- **Interactive Festival Map** 
- **Ticketing Section** 
- **FAQ & Partners** 

#### 🎯 Performance Features
- **Lazy Loading** for non-critical components
- **Image Optimization** (AVIF format)

#### 🗺️ Interactive Map Features
- **Leaflet Integration** with custom markers
- **Geolocation Support** for user positioning
- **Fullscreen Mode** for better navigation

### 🔧 Technical Implementation

#### Lazy Loading Implementation
```
// Component lazy loading
const Billetterie = lazy(() => import('./components/Billetterie'));
const FAQ = lazy(() => import('./components/FAQ'));

// Suspense wrapper
<Suspense fallback={<CircularProgress />}>
  <Billetterie />
</Suspense>
```

### 🚀 Deployment

#### Production Build
```
# Create optimized production build
npm run build

# Serve static files
npx serve -s build
```

#### Environment Setup
- **Development:** `npm start` on port 3000
- **Production:** Static files served from `/build` directory

### 🔒 Security & Privacy

#### Data Protection
- **GDPR Compliance** 
- **Local Storage** for non-sensitive data only
- **Legal notices** in the footer

### 🐛 Troubleshooting

#### Common Issues
**Build Failures:** Check Node.js version compatibility
**Map Not Loading:** Check Leaflet CSS imports

#### Debug Mode
```
# Enable verbose logging
REACT_APP_DEBUG=true npm start
```

### 📚 Additional Resources

#### Documentation Links
- [React Documentation](https://react.dev/)
- [Material-UI Components](https://mui.com/)
- [Leaflet Maps](https://leafletjs.com/)





---





## 🇫🇷 DOCUMENTATION FRANÇAISE

### 🚀 Technologies Utilisées

**Technologies Principales :**
- **React 19.0.0** - Dernière version de React pour le développement d'interfaces basées sur des composants
- **React DOM 19.0.0** - Bibliothèque de rendu DOM
- **Material-UI (MUI) 6.4.12** - Bibliothèque de composants React avec Material Design
- **React Router DOM 7.6.2** - Routage côté client pour la navigation SPA

**Interface & Styling :**
- **@emotion/react & @emotion/styled 11.14.0** - Solution de styling CSS-in-JS
- **@mui/icons-material 6.4.12** - Icônes Material Design
- **React Slick 0.30.3** - Composant carrousel pour artistes/événements
- **Slick Carousel 1.8.1** - CSS/JS pour la fonctionnalité carrousel

**Fonctionnalités Interactives :**
- **Leaflet 1.9.4** - Bibliothèque de cartographie open-source
- **React Leaflet 5.0.0** - Composants React pour les cartes Leaflet
- **React Scroll 1.9.3** - Navigation avec défilement fluide

**Développement & Tests :**
- **React Scripts 5.0.1** - Outils de build et serveur de développement
- **Suite Testing Library** - Utilitaires de test pour composants React
- **Web Vitals 2.1.4** - Surveillance des performances

### 🏗️ Architecture du Projet

#### Structure des Composants
- **Composants Principaux :** `index.js`, `Navbar.js`, `Background.js`, `Presentation.js`, `Footer.js`
- **Composants Fonctionnels :** `Programmation.js`, `Artistes.js`, `FestivalMap.js`
                                `Billetterie.js`, `FAQ.js`, `Partenaires.js`

#### Optimisations de Performance
- **Division du Code :** React.lazy() pour les composants non critiques
- **Optimisation des Assets :** Images AVIF, chargement responsive
- **Gestion d'État :** Hooks React, LocalStorage

### 📱 Design Responsive
- **Mobile :** `< 600px` (menu hamburger, optimisé tactile)
- **Tablette :** `600px - 900px` (mise en page adaptive)
- **Desktop :** `> 900px` (navigation complète, multi-colonnes)

### 🔧 Fonctionnalités d'Application Web Progressive
- Compteur en temps réel
- Carte interactive avec géolocalisation

### 🛠️ Installation & Configuration

#### Démarrage Rapide
```
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm start

# Build pour la production
npm run build
```

#### Structure des Fichiers
```
src/
├── components/         # Composants React
├── images/             # Assets d'images
├── data/               # Données statiques (JSON)
├── index.js            # Composant principal
└── reportWebVitals.js  # Métriques de performance
```

### 📋 Aperçu des Fonctionnalités

#### 🎵 Fonctionnalités Principales
- **Section Hero** avec compte à rebours en temps réel
- **Carrousel d'Artistes** 
- **Programmation d'Événements** avec filtrage et modales
- **Carte Interactive du Festival** 
- **Section Billetterie** 
- **FAQ & Partenaires** 

#### 🎯 Fonctionnalités de Performance
- **Chargement Paresseux** pour les composants non critiques
- **Optimisation d'Images** (format AVIF)

#### 🗺️ Fonctionnalités de Carte Interactive
- **Intégration Leaflet** avec marqueurs personnalisés
- **Mode Plein Écran** pour une meilleure navigation

### 🔧 Implémentation Technique

#### Implémentation du Chargement Paresseux
```
// Chargement paresseux des composants
const Billetterie = lazy(() => import('./components/Billetterie'));
const FAQ = lazy(() => import('./components/FAQ'));

// Wrapper Suspense
<Suspense fallback={<CircularProgress />}>
  <Billetterie />
</Suspense>
```

### 🚀 Déploiement

#### Build de Production
```
# Créer un build de production optimisé
npm run build

# Servir les fichiers statiques
npx serve -s build
```

#### Configuration d'Environnement
- **Développement :** `npm start` sur le port 3000
- **Production :** Fichiers statiques servis depuis le répertoire `/build`

### 🔒 Sécurité & Confidentialité

#### Protection des Données
- **Conformité RGPD** 
- **Local Storage** pour les données non sensibles uniquement
- **Mentions légales** dans le footer
  
### 🐛 Dépannage

#### Problèmes Courants
1. **Échecs de Build :** Vérifier la compatibilité de version Node.js
3. **Carte Non Chargée :** Vérifier les imports CSS Leaflet

#### Mode Debug
```
# Activer le logging verbeux
REACT_APP_DEBUG=true npm start
```

### 📚 Ressources Supplémentaires

#### Liens de Documentation
- [Documentation React](https://react.dev/)
- [Composants Material-UI](https://mui.com/)
- [Cartes Leaflet](https://leafletjs.com/)
