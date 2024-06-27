
const resultBox = document.querySelector(".js-result-box");
const inputBox = document.querySelector(".js-input-box");


export function initSearchBar(array) {

    // set listener for search bar
    inputBox.addEventListener("keyup", () => {
        let results = [];
        let input = inputBox.value;
        if (input.length) {
            results = array.filter((keyWord) => {
                return keyWord.toLowerCase().includes(input.toLowerCase());
            });
        }

        displayResults(results);
    });
}

function displayResults(results, num=5) {
    // displays only the first num results
    // TODO: display however many generated, but limit number generated? 
    let resultHTML = "";
    for (let i=0;i<Math.min(num, results.length);i++) {
        resultHTML += `<li>${results[i]}</li>\n`;
    }
    resultBox.innerHTML = `<ul>${resultHTML}</ul>`;
}