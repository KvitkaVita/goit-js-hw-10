const BASE_URL = 'https://restcountries.com/v3.1/name/';

function fetchCountries(name) {
  return fetch(
    `&{BASE_URL}&{name}?fields=name,capital,populatin,flags.svg,languages"`
  ).then(r => {
    if (!r.ok) {
       throw new Error(Notiflix.Notify.failure("Oops, there is no country with that name")) 
  
    }
    return r.json();
});
}
fetchCountries().then(data => console.log(data))

export default { fetchCountries };