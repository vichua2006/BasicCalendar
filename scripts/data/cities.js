import { getIconFileName } from '../icons.js';

const weatherApiKey = 'e0f946d1c2eb46e281a161411242706'; // Weather API (https://www.weatherapi.com/)
const geocodingApiKey = 'CD42F9D5E5CED1419FB6D560A459490A'; // Trimble maps

export var cities = [
  'Las Vegas, NV',
  'Phoenix, AZ',
  'Toronto, ON',
  'Scottsdale, AZ',
  'Charlotte, NC',
  'Pittsburgh, PA',
  'Tempe, AZ',
  'Henderson, NV',
  'Mesa, AZ',
  'Montréal, QC',
  'Chandler, AZ',
  'Gilbert, AZ',
  'Cleveland, OH',
  'Madison, WI',
  'Glendale, AZ',
  'Edinburgh, EDH',
  'Mississauga, ON',
  'Peoria, AZ',
  'Markham, ON',
  'North Las Vegas, NV',
  'Fredericton, NB',
];

export class City {
  #searchName;
  #geoData;
  #weatherData;

  constructor(cityName) {
    this.#searchName = cityName;
  }

  async updateAllData() {
    // must be called before using other methods; use await
    await this.updateGeoData();
    // await Promise.all([this.updateWeatherData(), this.updateForcastData()]);
    await this.updateWeatherData();
  }

  async updateGeoData() {
    // calls API to obtain city's geographical information
    try {
      const response = await fetch(
        `https://singlesearch.alk.com/NA/api/search?authToken=${geocodingApiKey}&query="${
          this.#searchName
        }"`
      );

      if (!response.ok) {
        throw new Error('Geo API response not ok');
      }

      const responseJson = await response.json();
      this.#geoData = responseJson.Locations[0];
    } catch (error) {
      console.log(error);
    }
  }

  async updateWeatherData() {
    try {
      const coords = this.getLatLng();
      const lat = Number(coords.Lat),
        lng = Number(coords.Lon);
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${lat},${lng}&days=7&aqi=no&alert=no`
      );

      if (!response.ok) {
        throw new Error('Weather API (Current) response not ok');
      }

      this.#weatherData = await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  generateTodayHTML() {
    const todayForcast = this.#getForcastForDay(0);
    const hourForcast = todayForcast.hour;

    let todayHTML = '';
    for (let i = 6; i <= 21; i += 3) {
      const hour = hourForcast[i];
      const date = new Date(hour.time);
      const iconFileName = getIconFileName(hour.condition.code);

      // TODO: find a way to format toLocaleTimeString correct to fix html formatting
      const hourHTML = `

                <div class="today-forecast">
                    <div class="today-forecast-time">
                        ${date.toLocaleTimeString([], {
                          hour12: true,
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                    </div>
                    <div class="today-forecast-image">
                        <img src="images/weather-conditions/${iconFileName}" alt="">
                    </div>
                    <div class="today-forecast-temperature">
                        ${hour.temp_c.toFixed(0)}&deg
                    </div>
                </div> 
            `;

      todayHTML += hourHTML;
    }

    return todayHTML;
  }

  generateSevenDayHTML() {
    const weekday = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let sevenDayHTML = `<div class="weekly-forecast-label">7-Day Forecast</div>`;
    for (let forecast of this.#weatherData.forecast.forecastday) {
      const day = forecast.day;
      const date = new Date(forecast.date);
      const iconFileName = getIconFileName(day.condition.code);

      const dayHTML = `
            <div class="weekly-forecast-cell">
                <div class="weekly-forecast-day-label">${
                  weekday[date.getDay()]
                }</div>
                <img class="weekly-forecast-weather-condition-image" src="images/weather-conditions/${iconFileName}" alt="">
                <div class="weekly-forecast-weather-condition-label">${
                  day.condition.text
                }</div>
                <div class="weekly-forecast-temperature">
                    <span class="weekly-forecast-high-temperature-label">
                        ${day.maxtemp_c.toFixed()}
                    </span>
                        /${day.mintemp_c.toFixed()}
                </div>
            </div>
       `;

      sevenDayHTML += dayHTML;
    }

    return sevenDayHTML;
  }

  #getForcastForDay(nDaysAhead) {
    return this.#weatherData.forecast.forecastday[nDaysAhead] || null;
  }

  getLatLng() {
    // returns an object with two properties: lat and lng; coordinates are in string
    const coords = this.#geoData.Coords;
    if (!coords)
      throw new Error('Unable to load lat/lng coordinates from geoData');

    return coords;
  }

  getWeatherData() {
    return this.#weatherData;
  }

  getCityName() {
    return this.#weatherData.location.name;
  }

  getCurrTempC() {
    return this.#weatherData.current.temp_c;
  }

  getFeelsLikeC() {
    return this.#weatherData.current.feelslike_c;
  }

  getWeatherCode() {
    return this.#weatherData.current.condition.code;
  }

  getWindKPH() {
    return this.#weatherData.current.wind_kph;
  }

  getUVIndex() {
    return this.#weatherData.current.uv;
  }

  getChanceOfRain() {
    const day = this.#getForcastForDay(0);
    return day.day.daily_chance_of_rain;
  }
}
