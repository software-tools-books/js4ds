const fetch = require('node-fetch')

try {
  fetch('https://api.nasa.gov/neo/rest/v1/feed?api_key=DEMO_KEY&start_date=20-08-2108')
}
catch (err) {
  console.log(err)
}
