import axios from 'axios';

export default instance = axios.create({  // create app specific axios instance 
    baseURL: 'https://rn-shop-app-1a745.firebaseio.com/'
});