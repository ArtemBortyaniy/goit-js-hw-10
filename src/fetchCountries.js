export default class ApiCoutry {
    constructor () {
        this.countries = '';
    }

    fetchCountries() {
        const url = `https://restcountries.com/v3.1/name/${this.countries}?fields=name,name.official,capital,population,flags,languages`;

        return fetch(url).then(response => {
            if (!response.ok) {
              throw new Error(response.status);
            }
            return response.json();
        });
    }

    get country() {
        return this.countries   
    }

    set country(newCountries) {
        this.countries = newCountries;
    }
}

