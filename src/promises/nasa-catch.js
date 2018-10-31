const fetch = require('node-fetch')

new Promise((resolve, reject) => {
  fetch('https://api.nasa.gov/neo/rest/v1/feed?api_key=DEMO_KEY&start_date=20-08-2108')
  .then((response) => {
    if (response.status === 200) {
      resolve('fetched page successfully')
    }
    else {
      reject(Error(`got HTTP status code ${response.status}`))
    }
  })
}).then((message) => console.log(message))
.catch((error) => console.log(error.message))
