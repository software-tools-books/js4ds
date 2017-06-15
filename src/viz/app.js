// Imports
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { range } from 'd3-array'
import { scaleThreshold } from 'd3-scale'
import BarChart from './BarChart'
import biomass from './biomass'

// Color scale
const colorScale = scaleThreshold()
      .domain([5,10,20,30])
      .range(["#75739F", "#5EAFC6", "#41A368", "#93C464"])

class App extends Component {

  // Constructor
  constructor(props){
    super(props)
    this.state = {
      screenWidth: 1000,
      screenHeight: 500
    }
  }

  // Window resize
  onResize = () => {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight - 120
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize, false)
    this.onResize()
  }

  // Rendering
  render() {
    const size = [this.state.screenWidth / 2, this.state.screenHeight / 2]
    return (
      <div className="App">
        <BarChart
          colorScale={colorScale}
          data={biomass}
          size={size} />
      </div>
    )
  }
}

// Connecting the wires
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
