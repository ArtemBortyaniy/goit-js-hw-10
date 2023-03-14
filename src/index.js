import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import FetchCountriesApi from './fetchCountries'

const countrySeach = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const fetchCountriesApi = new FetchCountriesApi();
const DEBOUNCE_DELAY = 300;

countrySeach.addEventListener('input', debounce(getApiCountry, DEBOUNCE_DELAY));

function getApiCountry (event){
    fetchCountriesApi.country = event.target.value;

    clearList();

    fetchCountriesApi.fetchCountries().then((countries) => {
            if(countries.length > 1) {
                countryListEl.insertAdjacentHTML('beforeend', generateMarkapCountries(countries));
            } else {
                countryInfo.insertAdjacentHTML('beforeend', generateMarkapIngoCountry(countries));
            }
    
            return countries;
        }).then(countries => { 
            if(countries.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            }
        }).catch(error => {
            return Notiflix.Notify.failure("Oops, there is no country with that name");
        });
}


function generateMarkapCountries (countries) {
    return[...countries].map(({flags: {svg}, name : {common}}) => {
        return `<li class="country-label">
            <img src='${svg}' class="country-flag">
            <p>${common}</p>
            </li>`
    }).join('');
}

function generateMarkapIngoCountry (country){
    return [...country].map(({name : {common}, flags: {svg}, capital, population, languages : {deu}}) => {
        return `<p class="country-label">
            <img src='${svg}' class="country-flag">${common}</p>
            <p><b>Capital: </b>${capital}</p>
            <p><b>Population: </b>${population}</p>
            <p><b>Languages: </b>${deu}</p>`
        });
}

function clearList () {
    countryListEl.innerHTML = '';
    countryInfo.innerHTML = '';
}

