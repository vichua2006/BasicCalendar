
export class GeoCoordinates {
    #latitude;
    #longitude;

    constructor(lat, long) {
        this.#latitude = lat;
        this.#longitude = long;
    }

    getLat() {
        return this.#latitude;
    }

    getLong() {
        return this.#longitude;
    }

    getStringPair() {
        return `${this.#latitude},${this.#longitude}`;
    }
}


function getUserLocation() {
    return {dummy_data: "nothing"};   
}