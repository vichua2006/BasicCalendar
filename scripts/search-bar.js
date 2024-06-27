import { City } from './data/cities.js';
import { renderPage } from './main.js';
const resultBox = document.querySelector('.js-result-box');
const inputBox = document.querySelector('.js-input-box');

let upFired = false;
let downFired = false;
let results = [];

export function initSearchBar(array) {
  inputBox.addEventListener('keyup', (event) => {
    let input = inputBox.value;
    if (input.length) {
      results = array.filter((keyWord) => {
        return keyWord.toLowerCase().includes(input.toLowerCase());
      });
    }
    displayResults(results);
  });
}

let resultNum = 0;

async function searchResultSelected(name) {
  const city = new City(name);
  await city.updateAllData();
  renderPage(city);
  resultBox.style.display = 'none';
  inputBox.value = '';
  resultsNum = 0;
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
    suggestion.addEventListener('click', async () => {
      const name = suggestion.dataset.searchSuggestion;
      searchResultSelected(name);
    });
  });
}
