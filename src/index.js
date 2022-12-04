import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const countryInput = document.querySelector('#search-box');

countryInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const searchValue = e.target.value.trim();

  fetchCountries(searchValue).then(data => {
    if (data.length > 1 && data.length <= 10) {
      createMarkupCountryList(data);
    } else if (data.length === 1) {
      createMarkupCountryCard(data);
    } else if (data.length > 10) {
      return Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    }
  });
}

// fetchCountries(searchValue).then(data => {
//   if (data.length > 1 && data.length <= 10) {
//     fetchCountries(searchValue).then(data => createMarkupCountryList(data));
//   }
// });

// fetchCountries(searchValue).then(data => {
//   if ((data.length = 1)) {
//     fetchCountries(searchValue).then(data => createMarkupCountryCard(data));
//   }
// });

// fetchCountries(searchValue).then(data => {
//   if (data.length > 10) {
//     Notiflix.Notify.info(
//       'Too many matches found. Please enter a more specific name.'
//     );
//   }
// });

function createMarkupCountryList(array) {
  const mark = array
    .map(({ flags, name }) => {
      return `<img src="${flags.svg}" alt="${name}" width="80" />
      <p class="name">${name.official}</p>`;
    })
    .join('');
  // countryList.innerHTML = mark;

  countryList.insertAdjacentHTML('beforeend', mark);
}

function createMarkupCountryCard(arr) {
  const markup = arr
    .map(({ name, flags, capital, population, languages }) => {
      return `<div class ="card">
        <img src="${flags.svg}" alt="${name}" width="80" />
        <p class="name">${name.official}</p>
        </div>
        <p class="info"><span class="info-add">Capital: </span>${capital}</p>
        <p class="info"><span class="info-add">Population: </span>${population}</p>
        <p class="info"><span class="info-add">Languages: </span>${Object.values(
          languages
        )}</p>`;
    })
    .join('');
  // countryInfo.innerHTML = markup;
  countryInfo.insertAdjacentHTML('beforeend', markup);
}
