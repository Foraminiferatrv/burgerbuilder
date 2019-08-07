import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-cf10a.firebaseio.com/'
});

export default instance;