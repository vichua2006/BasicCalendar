import { initSearchBar } from './search-bar.js';
import { cities, City } from './data/cities.js';
import { getIconFileName } from './icons.js';


export function renderPage(newCity){

    // --------------- Single Elements -------------- //
    const cityName = newCity.getCityName();
    document.querySelector(".js-city-label").innerHTML = cityName;

    const iconFileName = getIconFileName(newCity.getWeatherCode());
    document.querySelector(
        '.js-weather-condition-image'
    ).src = `../images/weather-conditions/${iconFileName}`;

    const currTemp = newCity.getCurrTempC();
    document.querySelector('.js-temperature-label').innerHTML = `${currTemp}°C`;

    const feelsLike = newCity.getFeelsLikeC();
    document.querySelector(
        '.js-feelslike-temperature'
    ).innerHTML = `${feelsLike}°C`;

    const UVIndex = newCity.getUVIndex();
    document.querySelector('.js-uv-index').innerHTML = UVIndex;

    const windKPH = newCity.getWindKPH();
    document.querySelector('.js-wind-kph').innerHTML = `${windKPH} km/h`;

    const chanceOfRain = newCity.getChanceOfRain();
    document.querySelector('.js-chances-of-rain').innerHTML = `${chanceOfRain}%`;

    // Today's forcast rendering
    document.querySelector('.js-today-forcast-container')
            .innerHTML = newCity.generateTodayHTML();

    // 7 Day forecast rendering
    document.querySelector('.js-weekly-forecast-container')
        .innerHTML = newCity.generateSevenDayHTML();
}

initSearchBar(cities);
const newCity = new City('Vancouver, BC');
await newCity.updateAllData();
console.log(newCity.getWeatherData());

renderPage(newCity);
