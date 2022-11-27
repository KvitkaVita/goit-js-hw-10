import './css/styles.css';
import debounce from "lodash.debounce";
import Notiflix from "notiflix";
import API from "./fetchCountries";
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
const countryInput = document.querySelector("#search-box");

countryInput.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    const searchValue = e.currentTarget.value.trim()
    fetchCountries(searchValue).then(data => createMarkupCountryCard(data))
}

function createMarkupCountryCard(arr){
    const markup = arr.map(({ name, capital, populatin, flags, languages }) => {
        return `<div class ="card">
        <img class="flag" src="&{flags.svg}" alt="${name}" width="80" />
        <p class="name">${name.official}</p>
        </div>
        <p class="info"><span class="info-add">Capital: </span>${capital}</p>
        <p class="info"><span class="info-add">Population: </span>${population}</p>
        <p class="info"><span class="info-add">Languages: </span>${Object.values(languages)}</p>`
}).join("")
    countryList.innerHTML = markup;
}


// Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");