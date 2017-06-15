// Imports
import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max, sum } from 'd3-array'
import { select } from 'd3-selection'
import { legendColor } from 'd3-svg-legend'
import { transition } from 'd3-transition'

class BarChart extends Component {

  // Constructor and lifecycle methods
  constructor(props){
    super(props)
  }

  componentDidMount = () => {
    this.createBarChart()
  }

  componentDidUpdate = () => {
    this.createBarChart()
  }

  createBarChart = () => {

    // Useful variables
    const dataMax = max(this.props.data.map(d => d.biomass))
    const [xSize, ySize] = this.props.size
    const barWidth = xSize / this.props.data.length

    // Legend
    const legend = legendColor()
      .scale(this.props.colorScale)
      .labels(["Moult 1", "Moult 2", "Moult 3", "Moult 4"])

    select(this.node)
      .selectAll("g.legend")
      .data([0])
      .enter()
      .append("g")
      .attr("class", "legend")
      .call(legend)

    select(this.node)
      .select("g.legend")
      .attr("transform", "translate(" + (xSize - 100) + ", 20)")

    // Y-axis scale
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, ySize])

    // Data entry and exit
    select(this.node)
      .selectAll("rect.bar")
      .data(this.props.data)
      .enter()
      .append("rect")
      .attr("class", "bar")

    select(this.node)
      .selectAll("rect.bar")
      .data(this.props.data)
      .exit()
      .remove()

    // Creating the chart
    select(this.node)
      .selectAll("rect.bar")
      .data(this.props.data)
      .attr("x", (d, i) => i * barWidth)
      .attr("y", d => ySize - yScale(d.biomass))
      .attr("height", d => yScale(d.biomass))
      .attr("width", barWidth)
      .style("fill", (d, i) => this.props.colorScale(d.day))
      .style("stroke", "black")
      .style("stroke-opacity", 0.25)
  }

  // Rendering
  render() {
    const [xSize, ySize] = this.props.size
    return <svg ref={(node) => {this.node = node}} width={xSize} height={ySize}></svg>
  }
}

export default BarChart
