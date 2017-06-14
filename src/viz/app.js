import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import BarChart from './BarChart'
import worlddata from './world'
import { range } from 'd3-array'
import { scaleThreshold } from 'd3-scale'
import { geoCentroid } from 'd3-geo'

let appdata = worlddata.features
  .filter(d => geoCentroid(d)[0] < -20)

appdata
  .forEach((d,i) => {
    const offset = Math.random()
    d.launchday = i
    d.data = range(30).map((p,q) => q < i ? 0 : Math.random() * 2 + offset)
  })

const colorScale = scaleThreshold().domain([5,10,20,30]).range(["#75739F", "#5EAFC6", "#41A368", "#93C464"])

class App extends Component {
  constructor(props){
    super(props)
    this.state = { screenWidth: 1000, screenHeight: 500 }
  }

  onResize = () => {
    this.setState({ screenWidth: window.innerWidth, screenHeight: window.innerHeight - 120 })
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize, false)
    this.onResize()
  }

  render() {
    return (
      <div className="App">
        <BarChart colorScale={colorScale} data={appdata} size={[this.state.screenWidth / 2, this.state.screenHeight / 2]} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
