import { City } from './data/cities.js';
import { renderPage } from './main.js';
import { showLoading, hideLoading } from './loading.js';
const resultBox = document.querySelector('.js-result-box');
const inputBox = document.querySelector('.js-input-box');
const { Place } = await google.maps.importLibrary('places');

let results = [];
let suggestionSelected = 0;

async function getSuggestions(userInput) {

  const request = {
    textQuery: userInput,
    fields: ['displayName'],
    language: 'en-US',
    maxResultCount: 5,
    includedType: 'locality',
  };
  const { places } = await Place.searchByText(request);
  console.log(places);
}

export function initSearchBar(array) {
  getSuggestions('mumbai');
  inputBox.addEventListener('keydown', (event) => {
    if (
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown' ||
      event.key === 'Enter'
    )
      return;
    let input = inputBox.value;
    if (input.length) {
      results = array.filter((keyWord) => {
        return keyWord.toLowerCase().includes(input.toLowerCase());
      });
    }

    displayResults(results);
    suggestionSelected = 0;
  });
  inputBox.addEventListener('keydown', (e) => {
    const numberOfResultsShown = Math.min(5, results.length);
    document.querySelector(
      `.js-search-suggestion-${results[suggestionSelected].split(',')[0]}`
    ).style.backgroundColor = 'rgb(32, 43, 59)';
    switch (e.key) {
      case 'ArrowUp':
        suggestionSelected -= 1;
        if (suggestionSelected < 0) suggestionSelected += numberOfResultsShown;
        break;
      case 'ArrowDown':
        suggestionSelected += 1;
        if (suggestionSelected >= numberOfResultsShown)
          suggestionSelected -= numberOfResultsShown;
        break;
      case 'Enter':
        const name = document.querySelector(
          `.js-search-suggestion-${results[suggestionSelected].split(',')[0]}`
        ).dataset.searchSuggestion;
        searchResultSelected(name);
        break;
    }
    document.querySelector(
      `.js-search-suggestion-${results[suggestionSelected].split(',')[0]}`
    ).style.backgroundColor = 'grey';
  });

  inputBox.addEventListener('blur', () => {
    resultBox.style.display = 'none';
  });
  inputBox.addEventListener('focus', () => {
    displayResults(results);
  });
}


async function searchResultSelected(name) {
  showLoading();
  const city = new City(name);
  await city.updateAllData();
  renderPage(city);
  resultBox.style.display = 'none';
  inputBox.value = '';
  hideLoading();
}

function displayResults(results, num = 5) {
  // displays only the first num results
  // TODO: display however many generated, but limit number generated?
  const numberOfResultsShown = Math.min(num, results.length);
  let resultHTML = '';
  for (let i = 0; i < numberOfResultsShown; i++) {
    resultHTML += `<li class="js-search-suggestion js-search-suggestion-${
      results[i].split(',')[0]
    }" data-search-suggestion="${results[i]}">${results[i]}</li>\n`;
  }
  //   console.log('clicked');
  resultBox.style.display = results.length === 0 ? 'none' : 'block';
  resultBox.innerHTML = `<ul>${resultHTML}</ul>`;

  document.querySelectorAll('.js-search-suggestion').forEach((suggestion) => {
    suggestion.addEventListener('mousedown', async () => {
      const name = suggestion.dataset.searchSuggestion;
      searchResultSelected(name);
    });
  });
}
