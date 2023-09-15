import { API_KEY, ERRORS, SERVER_URL, SERVER_URL_2 } from './constants.js';
import { UI } from './ui.js';


async function requestWeather(city) {
    const url = `${SERVER_URL}?q=${city}&appid=${API_KEY}`;
    try {
        let resopnse = await  fetch(url);
        let data = await resopnse.json();
        if (data.cod == 400 || data.cod == 404) throw new Error(ERRORS.ERROR_404);
        [UI.INPUT.value, UI.INPUT.placeholder] = ['', data.name];
                    
        let city = data.name;
        let temperature = data.main.temp;
        let weather = data.weather[0].main;
        let feels = data.main.feels_like;
        let sunrise = data.sys.sunrise;
        let sunset = data.sys.sunset;
        let timezone = data.timezone;

        let result = {
            city,
            temperature,
            weather,
            feels,
            sunrise,
            sunset,
            timezone
        };

        return result;

    } catch(error) {
        UI.INPUT.value = '';
        console.log(error);
    }
}

async function requestForecast(city) {
    const url = `${SERVER_URL_2}?q=${city}&appid=${API_KEY}`;
    try {
        let resopnse = await fetch(url);
        let data = await resopnse.json();
        console.log(data);
        if (data.cod == 400 || data.cod == 404) throw new Error(ERRORS.ERROR_404);

        let result = [];

        for(let idx = 0; idx < 3; idx++) {
            let cur = data.list[idx];

            let temperature = cur.main.temp;
            let weather = cur.weather[0].main;
            let feels = cur.main.feels_like;
            let time = cur.dt_txt.split(' ')[1].split(':').slice(0,2).join(':');
            

            result.push({
                temperature,
                weather,
                feels,
                time,
                num: idx,
            });
        }
        return result;

    } catch(error) {
        console.log(error);
    }
}

function weatherRequest(city) {
    return Promise.all([requestWeather(city), requestForecast(city)]);
}

export default weatherRequest;