'use strict'

const btn = document.querySelector('.btn-country')
const countriesContainer = document.querySelector('.countries')

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg)
  countriesContainer.style.opacity = 1
}

const renderCountry = function (data, className = '') {
  const languages = Object.values(data.languages)
  const currencies = Object.values(data.currencies)

  // prettier-ignore
  const html = `
  <article class="country ${className}">
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
}

///////////////////////////////////////

// const getCountryData = function (country) {
//   // create new request
//   const request = new XMLHttpRequest()

//   // open for request
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`)

//   // send request
//   request.send()

//   // load the request
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText)
//     console.log(data)

//     const languages = Object.values(data.languages)
//     const currencies = Object.values(data.currencies)

//     // prettier-ignore
//     const html = `
//   <article class="country">
//         <img class="country__img" src="${data.flags.svg}" />
//         <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(+data.population / 1000000 ).toFixed(1)}M</p>
//             <p class="country__row"><span>🗣️</span>${languages[0]}</p>
//             <p class="country__row"><span>💰</span>${currencies[0].name}</p>
//         </div>
//     </article>
//     `

//     countriesContainer.insertAdjacentHTML('beforeend', html)
//     countriesContainer.style.opacity = 1
//   })
// }

// getCountryData('japan')
// getCountryData('india')
// getCountryData('usa')
// getCountryData('united kingdom')

// _---------------------------- Country and Neighbour -------------------------------

// ----------------------------- Country and Neighbour using AJAX ------------------------------

/*
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest()
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`)
  request.send()

  // load the request
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText)
    console.log(data)

    // Rendering the country
    renderCountry(data)

    // get neigbour country
    const neighbours = data.borders?.[0]

    // Guard clause
    if (!neighbours) return

    // AJAX call country 2
    const request2 = new XMLHttpRequest()
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbours}`)
    request2.send()

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText)
      console.log(data2)

      renderCountry(data2, 'neighbour')
    })
  })
}


getCountryAndNeighbour('usa')
getCountryAndNeighbour('india')
*/

// --------------------- Using PROMISES ----------------------------------

/*
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`).then(function (
    response
  ) {
    console.log(response)
    return response.json().then(function (data) {
      console.log(data)
      renderCountry(data[0])
    })
  })
}


const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]))
}
getCountryData('usa')
// getCountryData('portugal')

*/

const getJSON = function (url, msg) {
  return fetch(url).then(response => {
    console.log(response)

    // Handling error manually
    if (!response.ok) {
      throw new Error(`${msg} (${response.status})`)
    }
    return response.json()
  })
}

const getCountryAndNeighbour = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      // console.log(data)
      renderCountry(data[0])

      const neigbour = data[0]?.borders
      if (!neigbour) throw new Error('No neighbour found')

      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neigbour[0]}`,
        'Country not found'
      )
    })
    .then(data => {
      renderCountry(data[0], 'neighbour')
    })

    // Handling error using .catch()
    .catch(error => {
      console.error(`${error} happened.. TRY AGAIN!!`)
      renderError(`Oops .. Something went wrong!!! 🔴${error.message}`)
    })
}

// btn.addEventListener('click', function () {
//   getCountryAndNeighbour('australia')
// })

// ------------------------ Coding Challenge 1 ------------------------------
/*
const whereAmI = function (lat, lng) {
  // reverse-geocoding
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      // Handling err
      if (!response.ok) {
        throw new Error(
          `Can't load too many requests at the same time (${response.status})`
        )
      }
      return response.json()
    })
    .then(data => {
      console.log(data)
      console.log(`You are in ${data.city}, ${data.country}`)

      // country API
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
    })
    .then(response => {
      if (!response.ok) throw new Error('Country not found')
      return response.json()
    })
    // rendering data
    .then(data => renderCountry(data[0]))

    // catching err
    .catch(err => console.error(`Oops .. Something went wrong !! ${err}`))
}

whereAmI(60.192059, 24.945831)
*/

// console.log('Test Start')
// setTimeout(() => console.log('Timer 1'), 0)
// Promise.resolve('Resolved promise 1').then(res => console.log(res))

// Promise.resolve('promise 2').then(res => {
//   for (let i = 0; i < 10000000; i++) {}
//   console.log(res)
// })
// console.log('Test End')

// --------------------------- Creating Promises ----------------------------

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Wait for the announcement')
  // async
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You won the lottery 🎊')
    } else {
      reject(new Error('You lost.. Try again someday'))
    }
  }, 2000)
})

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err))

// -------------------- PROMISIFYING ------------------------

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000)
  })
}

// wait(5)
//   .then(() => {
//     console.log('I waited for 5 secs')
//     return wait(4)
//   })
//   .then(() => {
//     console.log('I waited for 3 secs')
//     return wait(1)
//   })
//   .then(() => console.log('Wait for 1'))

// setTimeout(() => {
//   console.log('1 seconds passed')
//   setTimeout(() => {
//     console.log('2 seconds passed')
//     setTimeout(() => {
//       console.log('3 seconds passed')
//       setTimeout(() => {
//         console.log('4 seconds passed')
//       }, 1000)
//     }, 1000)
//   }, 1000)
// }, 1000)

// wait(1)
//   .then(() => {
//     console.log('1 secs passed')
//     return wait(2)
//   })
//   .then(() => {
//     console.log('2 secs passed')
//     return wait(3)
//   })
//   .then(() => {
//     console.log('3 secs passed')
//     return wait(4)
//   })
//   .then(() => {
//     console.log('4 secs passed')
//   })

// -----------Instant Promises--------------

Promise.resolve('New resolved promise').then(res => console.log(res))
Promise.reject(new Error('Error happenend')).catch(err => console.error(err))

// ----------------- Promisifying GEOLOCATION API ------------------

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

// getPosition().then(res => console.log(res))

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    })
    // reverse-geocoding
    .then(response => {
      // Handling err
      if (!response.ok) {
        throw new Error(
          `Can't load too many requests at the same time (${response.status})`
        )
      }
      return response.json()
    })
    .then(data => {
      console.log(data)
      console.log(`You are in ${data.city}, ${data.country}`)

      // country API
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
    })
    .then(response => {
      if (!response.ok) throw new Error('Country not found')
      return response.json()
    })
    // rendering data
    .then(data => renderCountry(data[0]))

    // catching err
    .catch(err => console.error(`Oops .. Something went wrong !! ${err}`))
}

btn.addEventListener('click', whereAmI)
