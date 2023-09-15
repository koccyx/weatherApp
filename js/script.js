import { UI } from './ui.js';
import { changeWeather, toggleFavorites, findFavorite, setDefaultWeather } from './handlers.js';
import { renderFavorites } from './render.js';


UI.FORM.addEventListener('submit', changeWeather);
UI.OUTPUT.addEventListener('click', toggleFavorites);
UI.FAVORITES_UL.addEventListener('click', findFavorite);
document.addEventListener('DOMContentLoaded', setDefaultWeather);
document.addEventListener('DOMContentLoaded', renderFavorites);

