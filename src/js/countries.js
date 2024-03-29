import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { refs } from './services/refs';
import { fetchCountries } from './services/fetchCountries'

const DEBOUNCE_DELAY = 300;

refs.countrySeach.addEventListener('input', debounce(getApiCountry, DEBOUNCE_DELAY));

function getApiCountry (event){
    const countryName = event.target.value.trim();

    if(!countryName) {
        return;
    }
    
    fetchCountries(countryName).then((countryData) => {
        if(countryData.length > 10) {
            printResult();
            Notiflix.Notify.info(
                "Too many matches found. Please enter a more specific name.",
                { 
                    timeout : 1000 
                }
            );
        }
        if(countryData.length >= 2 && countryData.length <= 10) {
            printResult();
            refs.countryListEl.insertAdjacentHTML('beforeend', generateMarkapCountries(countryData));
        }
        if(countryData.length === 1) {
            printResult();
            refs.countryInfoEl.insertAdjacentHTML('beforeend', generateMarkapIngoCountry(countryData[0]));
        }
    }).catch(error => Notiflix.Notify.failure("Oops, there is no country with that name"));
}

function generateMarkapCountries (countries) {
    return [...countries].map(({flags: {svg}, name : {common}}) => {
        return `<li class="country-label">
            <img src='${svg}' class="country-flag">
            <p>${common}</p>
            </li>`
    }).join('');
}

function generateMarkapIngoCountry (country){
    const {
        name : {common}, 
        flags : {svg}, 
        capital,
        population,
        languages} = country;
        
        return `
        <p class="country-label">
        <img src='${svg}' class="country-flag">${common}</p>
        <p><b>Capital: </b>${capital}</p>
        <p><b>Population: </b>${population}</p>
        <p><b>Languages: </b>${Object.values(languages)}</p>
        `;
}

function printResult (countryList = '', countryInfo = '') {
    refs.countryListEl.innerHTML = countryList;
    refs.countryInfoEl.innerHTML = countryInfo;
}
