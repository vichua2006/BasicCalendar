import { initSearchBar } from "./search-bar.js";
import { cities, City } from "./data/cities.js";

initSearchBar(cities);

const newCity = new City("New Maryland, NB");