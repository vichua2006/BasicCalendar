

const allCities = cities.map((name) => {
    return new City(name);
});
const updates = await Promise.all(allCities.map((item) => {
    return item.updateAllData();
}))

allCities.forEach((c) => {
    console.log(c.getCurrTemp());
});