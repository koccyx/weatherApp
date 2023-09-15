import { FAVORITES } from './constants.js';
import { UI } from './ui.js';
import { checkFavorites, setTime } from './helpers.js';
import { translateToCelsius } from './helpers.js';
import * as cloudyUrl from '../img/cloudy.svg';
import * as rainUrl from '../img/rain.svg';
import * as snowUrl from '../img/snow.svg';
import * as sunnyyUrl from '../img/sunny.svg';


function renderWeather({city, feels, temperature, weather, sunrise, sunset, timezone}) {
    let celsiusTemperature = translateToCelsius(temperature);
    let icon = selectIcon(weather);
    let activity = checkFavorites(city) ? true : false;
    let [sunriseDate, sunsetDate] = setTime(sunrise, sunset, timezone);

    UI.MAIN_TEXT.innerText = city;
    UI.DEGREES.innerText = celsiusTemperature;
    UI.IMG.src = icon;
    UI.FEELS.innerText = translateToCelsius(feels); 
    UI.SUNRISE.innerText = sunriseDate;
    UI.SUNSET.innerText = sunsetDate;
    changeClassFavorites(activity);
}

function renderForecast(data) {
    renderRecursion(data, 0);
}


function selectIcon(weather) {
    switch (weather) {
        case 'Clouds':
            return cloudyUrl;
        case 'Clear':
            return sunnyyUrl;
        case 'Rain':
            return rainUrl;
        case 'Snow':
            return snowUrl;
        default:
            return sunnyyUrl;
    }
}

function toggleClassFavorites() {
    if (!UI.LIKE.classList.contains('active')) {
        UI.LIKE.classList.add('active'); 
    } else {
        UI.LIKE.classList.remove('active');
    }
} 

function changeClassFavorites(activity) {
    if (activity) {
        UI.LIKE.classList.add('active');
    } else {
        UI.LIKE.classList.remove('active');
    }
}

function renderFavorites() {
    UI.FAVORITES_UL.innerHTML = '';
    favoritesRecursion(FAVORITES, 0);
}

function favoritesRecursion(list, idx) {
    let arrList = [...list];
    if (arrList.length <= idx) return;

    const elemUi = document.createElement('li');
    elemUi.classList.add('weather-li');
    elemUi.innerText = arrList[idx];

    UI.FAVORITES_UL.append(elemUi);

    favoritesRecursion(list, idx + 1);
}

function renderRecursion(data, idx) {
    if(data.length <= idx) return;

    UI.FORECAST_TIME[idx].innerText = data[idx].time;
    UI.FORECAST_TEMPERATURE[idx].innerText = translateToCelsius(data[idx].temperature);
    UI.FAORECAST_FEELS[idx].innerText = translateToCelsius(data[idx].feels);
    UI.FORECAST_IMG[idx].src = selectIcon(data[idx].weather);

    renderRecursion(data, idx + 1);
}

export { renderWeather, toggleClassFavorites, renderFavorites, renderForecast };