const fetch = require('node-fetch')

url = 'https://api.nasa.gov/neo/rest/v1/feed' +
      '?api_key=DEMO_KEY&start_date=2018-08-20'
const prom = new Promise((resolve, reject) => {
  fetch(url)
  .then((response) => {
    if (response.status === 200) {
      resolve('fetched page successfully')
    }
  })
}).then((message) => console.log(message))
