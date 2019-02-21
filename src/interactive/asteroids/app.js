import React from "react"
import ReactDOM from "react-dom"
import {AsteroidList} from "./AsteroidList"
import {DateSubmit} from "./DateSubmit"

class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      newDate: '',
      asteroids: [
        {name: 'a30x1000', date: '2017-03-03',
         diameter: 30, distance: 1000},
        {name: 'a5x500', date: '2017-05-05',
         diameter: 5, distance: 500},
        {name: 'a2000x200', date: '2017-02-02',
         diameter: 2000, distance: 200}
      ]
    }
  }

  onEditNewDate = (text) => {
    this.setState({newDate: text})
  }

  onSubmitNewDate = (text) => {
    const url = 'https://api.nasa.gov/neo/rest/v1/feed' +
                `?api_key=DEMO_KEY&start_date=${text}`
    fetch(url).then((response) => {
      return response.json()
    }).then((raw) => {
      const asteroids = this.transform(raw)
      this.setState({
        newDate: '',
        asteroids: asteroids
      })
    })
  }

  render = () => {
    return (
      <div>
        <h1>Asteroids</h1>
        <DateSubmit
          label='Date'
          value={this.state.newDate}
          onChange={this.onEditNewDate}
          onCommit={this.onSubmitNewDate} />
        <AsteroidList asteroids={this.state.asteroids} />
      </div>
    )
  }

  transform = (raw) => {
    let result = []
    for (let key in raw.near_earth_objects) {
      raw.near_earth_objects[key].forEach((asteroid) => {
        result.push({
          name: asteroid.name,
          date: asteroid.close_approach_data[0].close_approach_date,
          diameter: asteroid.estimated_diameter.meters.estimated_diameter_max,
          distance: asteroid.close_approach_data[0].miss_distance.kilometers
        })
      })
    }
    return result
  }
}

const mount = document.getElementById("app")
ReactDOM.render(<App/>, mount)
