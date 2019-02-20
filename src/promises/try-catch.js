const fetch = require('node-fetch')

url = 'https://api.nasa.gov/neo/rest/v1/feed' +
      '?api_key=DEMO_KEY&start_date=2018-08-20'
try {
  fetch(url)
}
catch (err) {
  console.log(err)
}
