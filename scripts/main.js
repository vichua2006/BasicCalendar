import { initSearchBar } from "./search-bar.js";
import { cities, City } from "./data/cities.js";

initSearchBar(cities);

const allCities = cities.map((name) => {
    return new City(name);
});
const updates = await Promise.all(allCities.map((item) => {
    return item.updateAllData();
}))

allCities.forEach((c) => {
    console.log(c.getCurrTemp());
});

// const newCity = new City("new maryland, nb");
// await newCity.updateAllData();
// console.log(newCity.getCurrTemp());