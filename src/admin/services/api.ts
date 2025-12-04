import axios from 'axios';

export const api = axios.create({
    baseURL: '/wp-json',
    headers: {
        'Content-Type': 'application/json',
    },
});