
const loadScreen = document.querySelector(".js-loader");

export function showLoading() {
    loadScreen.classList.remove("loader--removed");
    loadScreen.classList.remove("loader--hidden");
}

export function hideLoading() {
    loadScreen.classList.add("loader--hidden");
    loadScreen.addEventListener("transitionend", () => {
        loadScreen.classList.add("loader--removed");
    });
}