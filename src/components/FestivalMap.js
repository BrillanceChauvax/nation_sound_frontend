import React, { useState } from 'react';
import { Container, Grid, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-fullscreen';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';

// Configuration des icônes par catégorie
const createIcon = (color) => L.icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41]
});

// Données des points d'intérêt
const POINTS = {
  SCENES: {
    type: 'Scènes',
    color: 'red',
    icon: createIcon('red'),
    points: Array.from({length: 5}, (_, i) => ({
      id: `scene-${i+1}`,
      name: `Scène ${i+1}`,
      position: [48.829 + i*0.001, 2.289 + i*0.0005],
      description: `Scène principale n°${i+1}`
    }))
  },
  BOUTIQUES: {
    type: 'Boutique souvenir',
    color: 'blue',
    icon: createIcon('blue'),
    points: Array.from({length: 3}, (_, i) => ({
      id: `boutique-${i+1}`,
      name: `Boutique ${i+1}`,
      position: [48.830 + i*0.0005, 2.290 + i*0.0005],
      description: 'Souvenirs du festival'
    }))
  },
  TOILETTES: {
    type: 'Toilettes',
    color: 'green',
    icon: createIcon('green'),
    points: Array.from({length: 8}, (_, i) => ({
      id: `toilette-${i+1}`,
      name: `Toilettes ${i+1}`,
      position: [48.831 + i*0.0003, 2.291 + i*0.0003],
      description: 'Accès libre'
    }))
  },
  BUVETTES: {
    type: 'Buvettes',
    color: 'orange',
    icon: createIcon('orange'),
    points: Array.from({length: 7}, (_, i) => ({
      id: `buvette-${i+1}`,
      name: `Buvette ${i+1}`,
      position: [48.828 + i*0.0004, 2.292 + i*0.0004],
      description: 'Rafraîchissements'
    }))
  },
  RESTAURATION: {
    type: 'Restauration',
    color: 'yellow',
    icon: createIcon('yellow'),
    points: Array.from({length: 7}, (_, i) => ({
      id: `resto-${i+1}`,
      name: `Restaurant ${i+1}`,
      position: [48.827 + i*0.0004, 2.293 + i*0.0004],
      description: 'Restauration variée'
    }))
  },
  AUTRES: {
    type: 'Autres',
    color: 'violet',
    icon: createIcon('violet'),
    points: [
      {
        id: 'securite',
        name: 'PC Sécurité',
        position: [48.8295, 2.2905],
        description: 'Poste de contrôle sécurité'
      },
      {
        id: 'accueil',
        name: 'Accueil',
        position: [48.8300, 2.2910],
        description: 'Point d\'information et d\'accueil'
      }
    ]
  }
};

const FestivalMap = () => {
  const [filter, setFilter] = useState('all');
  const position = [48.830025, 2.290344]; // Coordonnées du parc des expositions de Paris

  const handleFilterChange = (event) => setFilter(event.target.value);

  const filteredPoints = Object.values(POINTS).flatMap(category => 
    filter === 'all' || filter === category.type ? category.points : []
  );

  const MapComponent = ({ height }) => (
    <MapContainer 
      center={position} 
      zoom={15} 
      style={{ height: height, width: '100%' }}
      fullscreenControl={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {filteredPoints.map(point => {
        const category = Object.values(POINTS).find(cat => 
          cat.points.some(p => p.id === point.id)
        );
        return (
          <Marker key={point.id} position={point.position} icon={category.icon}>
            <Popup>
              <strong>{point.name}</strong><br/>
              {point.description}<br/>
              <em>Type : {category.type}</em>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );

  return (
    <section id="carte">
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
            <Typography 
              variant="h3" 
              component="h2" 
              align="center" 
              sx={{ 
                color: 'white', 
                mb: 4, 
                fontWeight: 'bold' 
              }}
            >
              Carte du Festival
            </Typography>
            <Box 
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Box 
                sx={{
                  width: '100%',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <Box 
                  sx={{
                    padding: '10px',
                    borderBottom: '1px solid #e0e0e0',
                  }}
                >
                  <FormControl fullWidth size="small">
                    <InputLabel 
                      sx={{ 
                        fontWeight: 'bold',
                        color: 'black',
                      }}
                    >
                      Filtrer par type
                    </InputLabel>
                    <Select 
                      value={filter} 
                      onChange={handleFilterChange} 
                      label="Filtrer par type"
                      sx={{
                        '& .MuiSelect-select': {
                          paddingY: '12px',
                        },
                      }}
                    >
                      <MenuItem value="all">Tous les points</MenuItem>
                      {Object.values(POINTS).map(({ type }) => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ height: '500px' }}>
                  <MapComponent height="100%" />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default FestivalMap;
