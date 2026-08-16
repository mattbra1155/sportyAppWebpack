import axios from 'axios';

// TheSportsDB free test API key is "3"
export const httpClient = axios.create({
  baseURL: 'https://www.thesportsdb.com/api/v1/json/3',
});
