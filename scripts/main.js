import { GeoCoordinates } from "./data.js";
import { assert } from "./utils.js";
const apiKey = "1032b7270496479e819154348242606"; 

function getUserLocation() {
    return {dummy_data: "nothing"};   
}


async function getWeatherDataByCoodinates(coordinates) {
    try {

        assert(coordinates instanceof GeoCoordinates); // check if is correct type

        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${coordinates.getStringPair}&aqi=no`);

        if (!response.ok){
            throw new Error("Weather API response not ok");
        }

        const weatherData = await response.json(); // get the parsed response body

        console.log(weatherData);
    }
    catch(error) {
        console.log(error);
    }

}

const c = new GeoCoordinates(45.896230, -66.67891);
getWeatherDataByCoodinates(c);
