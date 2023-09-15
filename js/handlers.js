import weatherRequest from './request.js';
import { UI } from './ui.js';
import { toggleClassFavorites, renderFavorites } from './render.js';
import { DEFAULT_CITY, ERRORS, FAVORITES } from './constants.js';
import { addCityToArray } from './helpers.js';
import { renderForecast, renderWeather } from './render.js';
import storage from './localStorage.js';
import {saveCityToCookie} from './cookieStorage.js';

async function changeWeather(e) {
    e.preventDefault();
    try {
        if (UI.INPUT.value == '') throw new Error(ERRORS.EMPTY_INPUT);
        saveCityToCookie(UI.INPUT.value);
        let data = await weatherRequest(UI.INPUT.value);
    
        renderWeather(data[0]);
        renderForecast(data[1]);
    } catch (error) {
        console.log(error);
    }
}

function toggleFavorites(e) {
    let button = e.target.closest('.like-button');
    if (!button) return;
    let infoNode = e.target.closest('.weather-info');
    let cityName = infoNode.querySelector('.text').innerText;
    
    toggleClassFavorites();
    addCityToArray(cityName);
    storage.saveFavorites(FAVORITES);
    renderFavorites();
}

async function findFavorite(e) {
    let city = e.target.closest('.weather-li');
    if (!city) return;
    try {
        let data = await weatherRequest(city.innerText);
        saveCityToCookie(city.innerText);
        renderWeather(data[0]);
        renderForecast(data[1]);
    } catch(error) {
        console.log(error);
    }
}

function setDefaultWeather() {
    try {
        weatherRequest(DEFAULT_CITY).then(data => {
            renderWeather(data[0]);
            renderForecast(data[1]);
        })
        .catch(error => {
            console.log(error);
        });
    } catch(error) {
        console.log(error);
    }
}

export {changeWeather, toggleFavorites, findFavorite, setDefaultWeather};