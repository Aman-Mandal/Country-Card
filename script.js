'use strict'

const btn = document.querySelector('.btn-country')
const countriesContainer = document.querySelector('.countries')

///////////////////////////////////////

const getCountryData = function (country) {
  // create new request
  const request = new XMLHttpRequest()

  // open for request
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`)

  // send request
  request.send()

  // load the request
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText)
    console.log(data)

    const languages = Object.values(data.languages)
    const currencies = Object.values(data.currencies)

    // prettier-ignore
    const html = `
  <article class="country">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000 ).toFixed(1)}M</p>
            <p class="country__row"><span>🗣️</span>${languages[0]}</p>
            <p class="country__row"><span>💰</span>${currencies[0].name}</p>
        </div>
    </article>
    `

    countriesContainer.insertAdjacentHTML('beforeend', html)
    countriesContainer.style.opacity = 1
  })
}

getCountryData('india')
getCountryData('usa')
getCountryData('japan')
getCountryData('united kingdom')