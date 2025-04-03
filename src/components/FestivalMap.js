import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-fullscreen';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import mapData from '../data/map-data.json';

// Configuration des icônes par catégorie
const createIcon = (color) => L.icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [20, 35],
  iconAnchor: [15, 40],
  shadowSize: [40, 40]
});

const Rectangle = () => {
  const map = useMap();

  useEffect(() => {
    // Coordonnées de la zone de délimitation
    const polygonCoords = [
      [48.85117, 2.300887],  // Sud-Ouest
      [48.854275, 2.30548],  // Sud-Est
      [48.864884, 2.288668], // Nord-Est
      [48.862104, 2.283745], // Nord-Ouest
      [48.85117, 2.300887]   // Sud-Ouest (répété pour fermer le polygone)
    ];

    // Création du polygone
    const polygon = L.polygon(polygonCoords, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.2,
      weight: 2
    }).addTo(map);

    // Ajustement de la vue de la carte pour inclure le polygone
    map.fitBounds(polygon.getBounds());

    // Nettoyage lors du démontage du composant
    return () => {
      map.removeLayer(polygon);
    };
  }, [map]);

  return null;
};


// Liaison du JSON pour les points
const POINTS = Object.entries(mapData).reduce((acc, [key, value]) => {
  acc[key] = {
    ...value,
    icon: createIcon(value.color)
  };
  return acc;
}, {});

// Géolocalisation utilisateur
const GeolocationControl = () => {
  const [isLocating, setIsLocating] = useState(false);
  const map = useMap();

  const handleLocate = () => {
    setIsLocating(true);
    map.locate({ setView: true });
  };

  useEffect(() => {
    if (!isLocating) return;

    const onLocationFound = (e) => {
      const radius = e.accuracy;
      L.marker(e.latlng)
        .addTo(map)
        .bindPopup(`Vous êtes ici (précision : ${Math.round(radius)} mètres)`)
        .openPopup();
      L.circle(e.latlng, radius).addTo(map);
      setIsLocating(false);
    };

    const onLocationError = () => {
      alert("La géolocalisation a échoué. Veuillez vérifier vos paramètres et réessayer.");
      setIsLocating(false);
    };

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    return () => {
      map.off('locationfound', onLocationFound);
      map.off('locationerror', onLocationError);
    };
  }, [map, isLocating]);

  // Bouton pour la géolocalisation
  return (
    <Button 
      onClick={handleLocate} 
      disabled={isLocating}
      variant="contained"
      aria-label="Me localiser sur la carte"
      sx={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        backgroundColor: 'white',
        color: 'black',
        '&:hover': { backgroundColor: '#f0f0f0' }
      }}
    >
      {isLocating ? 'Localisation en cours...' : 'Me localiser'}
    </Button>
  );
};

const FestivalMap = () => {
  const [filter, setFilter] = useState('all');
  const position = [48.858555, 2.293945];

  const handleFilterChange = (event) => setFilter(event.target.value);

  const filteredPoints = Object.values(POINTS).flatMap(category => 
    filter === 'all' || filter === category.type ? category.points : []
  );

  const MapComponent = () => (
    <MapContainer 
      center={position} 
      style={{ height: '100%', width: '100%' }}
      fullscreenControl={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeolocationControl />
      <Rectangle />
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
                      labelId="filter-label"
                      id="filter-select"
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
