import { FAVORITES } from './constants.js';
import {format} from 'date-fns';

function addCityToArray(cityName) {
    if (checkFavorites(cityName)) {
        deleteCityFromArray(cityName);
    } else {
        FAVORITES.add(cityName);
    }
}   

function checkFavorites(cityName) {
    return FAVORITES.has(cityName);
}

function deleteCityFromArray(cityName) {
    FAVORITES.delete(cityName);
}

function translateToCelsius(temperature) {
    return `${Math.round(temperature - 273)}°`;
}

function setTime(sunrise, sunset, timezone) {
    let difference = (10800 - timezone) * 1000; 
    let sunriseDate = new Date(sunrise * 1000 - difference);
    let sunsetDate = new Date(sunset * 1000 - difference);
    sunriseDate = format(sunriseDate, 'HH:mm');
    sunsetDate = format(sunsetDate, 'HH:mm');
    return [sunriseDate, sunsetDate];
}

export { setTime, addCityToArray, checkFavorites, translateToCelsius };