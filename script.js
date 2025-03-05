const volumeSlider = document.getElementById('volume');
const volumeSpan = document.getElementById('volumes');
const countriesContainer = document.getElementById('countries');
const sortAscButton = document.getElementById('sortAsc');
const sortDescButton = document.getElementById('sortDesc');
const sortAlphaButton = document.getElementById('sortAlpha'); 
const countryInput = document.getElementById('countryInput')
let allCountries = []; // Variable pour stocker les données des pays

volumeSlider.addEventListener('input', () => {
    volumeSpan.textContent = volumeSlider.value;
    displayCountries(allCountries, volumeSlider.value); // Mettre à jour l'affichage
});

const loadCountryAPI = () => {
    fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(data => {
            allCountries = data; // Stocker les données des pays
            displayCountries(allCountries, volumeSlider.value); // Afficher les pays en fonction de la valeur initiale de la barre de volume
        })
        .catch(error => console.error('Erreur:', error));
};

const displayCountries = (countries, number) => {
    console.log(countries);
    const limitedCountries = countries.slice(0, number); // Limiter le nombre de pays affichés
    const countriesHTML = limitedCountries.map(country => getCountry(country)).join('');
    countriesContainer.innerHTML = countriesHTML;
};
//fonction d'écouteur pour les recherches des pays 
countryInput.addEventListener('input', () => {
    const searchTerm = countryInput.value.toLowerCase(); // Convertir la saisie en minuscule
    const filteredCountries = allCountries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm)
    ); // Filtrer les pays qui correspondent au terme de recherche
    displayCountries(filteredCountries, filteredCountries.length); // Afficher seulement les pays filtrés
});
//écouteur pour le borderRadius de la bar de recherche au click
countryInput.addEventListener ('click', () => {
    countryInput.style.borderRadius = "50px";
});


const getCountry = country => {
    console.log(country);
    return `
    <div class="country">
        <img src="${country.flags.png}" alt="Drapeau de ${country.name.common}">
        <h2>${country.name.common}</h2>
        <p><strong>Population :</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Continent :</strong> ${country.region}</p>
    </div>`;
};
// Appeler la fonction pour charger les données de l'API
loadCountryAPI();
// Fonctions de tri
sortAscButton.addEventListener('click', () => {
    const sortedCountries = [...allCountries].sort((a, b) => a.population - b.population);
    displayCountries(sortedCountries, volumeSlider.value);
});

sortDescButton.addEventListener('click', () => {
    const sortedCountries = [...allCountries].sort((a, b) => b.population - a.population);
    displayCountries(sortedCountries, volumeSlider.value);
});

sortAlphaButton.addEventListener('click', () => {
    const sortedCountries = [...allCountries].sort((a, b) => a.name.common.localeCompare(b.name.common));
    displayCountries(sortedCountries, volumeSlider.value);
});


