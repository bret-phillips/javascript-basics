import axios from 'axios';

const API_KEY = '9147ea2d7e1965642cd48074ded99d5b';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER'

export function fetchWeather(city) {
  const url = `${ROOT_URL}&q=${city},us`;
  // for google books api - const url = 'https://www.googleapis.com/books/v1/volumes?q=harry+potter';
  const request = axios.get(url);

  return {
    type: FETCH_WEATHER,
    payload: request
  };
}
