const API_URL = 'http://localhost:3333/weather';

export const getWeather = async (city: string) => {
  try {
    const response = await fetch(`${API_URL}?city=${encodeURIComponent(city)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    return await response.json();
  } catch (error) {
    console.error('Weather fetch error:', error);
    throw error;
  }
};
