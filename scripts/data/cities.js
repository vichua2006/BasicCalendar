import { assert } from "../utils.js";


const weatherApiKey = "1032b7270496479e819154348242606"; // Weather API (https://www.weatherapi.com/) 
const geocodingApiKey = "CD42F9D5E5CED1419FB6D560A459490A"; // Trimble maps



export var cities = [

    "Las Vegas, NV",
    "Phoenix, AZ",
    "Toronto, ON",
    "Scottsdale, AZ",
    "Charlotte, NC",
    "Pittsburgh, PA",
    "Tempe, AZ",
    "Henderson, NV",
    "Mesa, AZ",
    "Montréal, QC",
    "Chandler, AZ",
    "Gilbert, AZ",
    "Cleveland, OH",
    "Madison, WI",
    "Glendale, AZ",
    "Edinburgh, EDH",
    "Mississauga, ON",
    "Peoria, AZ",
    "Markham, ON",
    "North Las Vegas, NV",
    "Fredericton, NB",

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
        await this.updateWeatherData();
    }

    async updateGeoData() {
        // calls API to obtain city's geographical information
        try {
            const response = await fetch(`https://singlesearch.alk.com/NA/api/search?authToken=${geocodingApiKey}&query="${this.#searchName}"`);
            
            if (!response.ok) {
                throw new Error("Geo API response not ok");
            }

            const responseJson = await response.json();
            this.#geoData = responseJson.Locations[0];

        } catch (error){
            console.log(error);
        }
    }

    async updateWeatherData() {

        try {

            const coords = this.getLatLng();
            const lat = Number(coords.Lat), lng = Number(coords.Lon);
            const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${lat},${lng}&aqi=no`);

            if (!response.ok){
                throw new Error("Weather API response not ok");
            }

            this.#weatherData = await response.json();

        }
        catch(error) {
            console.log(error);
        }
    }

    getLatLng() {
        // returns an object with two properties: lat and lng; coordinates are in string
        const coords = this.#geoData.Coords;
        if (!coords) throw new Error("Unable to load lat/lng coordinates from geoData");

        return coords;
    }
    
    getWeatherData() {
        return this.#weatherData;
    }

    getCityName(){
        return this.#weatherData.location.name;
    }

    getCurrTempC() {
        return this.#weatherData.current.temp_c;
    }

    getFeelsLikeC() {
        return this.#weatherData.current.feelslike_c;
    }

    getWindKPH() {
        return this.#weatherData.current.wind_kph;
    }

    getUVIndex() {
        return this.#weatherData.current.uv;
    }
}

