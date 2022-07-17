import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:5000',
  baseURL: 'https://rt-exercise-tracker.herokuapp.com',
});

export default instance;
