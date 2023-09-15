import storage from './localStorage.js';
import { getCityFromCookie } from './cookieStorage.js';

class Error_404 extends Error {
    constructor(message) {
        super(message);
        this.name = 404;
    }
}

class Error_input extends Error {
    constructor(message) {
        super(message);
        this.name = 'City is not found, please, try another';
    }
}

const API_KEY = '8572d029531a9a7e33ab730597971f9a';
const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather';
const SERVER_URL_2 = 'http://api.openweathermap.org/data/2.5/forecast';
const ERRORS = {
    ERROR_404: new Error_404('City is not found, please, try another'),
    EMPTY_INPUT: new Error_input('Input is empty, please, input smth'),
};


getCityFromCookie();

const DEFAULT_CITY = getCityFromCookie() ? getCityFromCookie() : 'Moscow';
const FAVORITES = storage.getFavorites() ? new Set(storage.getFavorites()) : new Set(); 
export {API_KEY, SERVER_URL, SERVER_URL_2, ERRORS, FAVORITES, DEFAULT_CITY};