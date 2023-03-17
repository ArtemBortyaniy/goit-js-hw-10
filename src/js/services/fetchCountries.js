const BASE_COUNTRIES_URL = 'https://restcountries.com/v3.1/name/';
const saearchParams = new URLSearchParams({
    fields : 'name,capital,population,flags,languages',
});

function fetchCountries(countryName) {
    const url = `${BASE_COUNTRIES_URL}${countryName}?${saearchParams}`;

    return fetch(url).then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
    });
}

export { fetchCountries };


