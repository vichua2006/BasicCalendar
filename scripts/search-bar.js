import { cities } from './data/cities.js';

const resultBox = document.querySelector('.js-result-box');
const inputBox = document.querySelector('.js-input-box');

export function initSearchBar() {
  inputBox.addEventListener('keyup', () => {
    let results = [];
    let input = inputBox.value;
    if (input.length) {
      results = cities.filter((keyWord) => {
        return keyWord.toLowerCase().includes(input.toLowerCase());
      });
    }

    displayResults(results);
  });
}

function displayResults(results, num = 5) {
  // displays only the first num results
  // TODO: display however many generated, but limit number generated?
  let resultHTML = '';
  for (let i = 0; i < Math.min(num, results.length); i++) {
    resultHTML += `<li class="js-search-suggestion" data-search-suggestion="${results[i]}">${results[i]}</li>\n`;
  }
  //   console.log('clicked');
  resultBox.style.display = results.length === 0 ? 'none' : 'block';
  resultBox.innerHTML = `<ul>${resultHTML}</ul>`;
  document.querySelectorAll('.js-search-suggestion').forEach((suggestion) => {
    suggestion.addEventListener('click', () => {
      console.log(suggestion.dataset.searchSuggestion);
    });
  });
}
