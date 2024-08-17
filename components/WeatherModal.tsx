"use client";

import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { getWeather } from '../services/weatherService';

interface WeatherModalProps {
  open: boolean;
  onClose: () => void;
}

const WeatherModal: React.FC<WeatherModalProps> = ({ open, onClose }) => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const data = await getWeather(city);
      setWeather(data);
      setError(null);
    } catch (error) {
      setWeather(null);
      setError('Failed to fetch weather data');
    }
  };

  const renderWeather = () => {
    if (!weather) return null;

    const {
      main: { temp, feels_like, temp_min, temp_max, humidity },
      weather: [{ description }],
      name,
    } = weather;

    return (
      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          Weather in {name}
        </Typography>
        <Typography>
          Temperature: {temp}°C
        </Typography>
        <Typography>
          Feels Like: {feels_like}°C
        </Typography>
        <Typography>
          Min Temperature: {temp_min}°C
        </Typography>
        <Typography>
          Max Temperature: {temp_max}°C
        </Typography>
        <Typography>
          Humidity: {humidity}%
        </Typography>
        <Typography>
          Description: {description}
        </Typography>
      </Box>
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" mb={2}>
          Check Weather by City
        </Typography>
        <TextField
          label="City Name"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
        {renderWeather()}
      </Box>
    </Modal>
  );
};

export default WeatherModal;
