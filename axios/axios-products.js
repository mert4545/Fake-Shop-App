import axios from 'axios';

export default instance = axios.create({
    baseURL: 'https://rn-shop-app-1a745.firebaseio.com/'
});