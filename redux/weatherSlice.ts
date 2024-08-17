import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherData {
  temperature: string;
  condition: string;
}

interface WeatherState {
  weather: WeatherData | null;
}

const initialState: WeatherState = {
  weather: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeather: (state, action: PayloadAction<WeatherData>) => {
      state.weather = action.payload;
    },
  },
});

export const { setWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
