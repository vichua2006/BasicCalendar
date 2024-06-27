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
    #name;
    #geoData;
    #weatherData;

    constructor(cityName) {
        this.#name = cityName;
        this.updateGeoData(); 
    }

    async updateGeoData() {
        // calls API to obtain city's geographical information
        try {
            const resposne = await fetch(`https://singlesearch.alk.com/NA/api/search?authToken=${geocodingApiKey}&query="${this.#name}"`);
            
            if (!resposne.ok) {
                throw new Error("Geo API response not ok");
            }

            this.#geoData = await resposne.json();

            console.log(this.#geoData);

        } catch (error){
            console.log(error);
        }
    }

    async updateWeatherData() {

        try {

            const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${"random text"}&aqi=no`);

            if (!response.ok){
                throw new Error("Weather API response not ok");
            }

            this.#weatherData = await response.json();

            console.log(weatherData);
        }
        catch(error) {
            console.log(error);
        }
    }

    getLatLng() {
        
        return ;
    }
}

