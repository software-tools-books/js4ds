import React from 'react'
import { max, sum } from 'd3-array'
import { select } from 'd3-selection'

class DataDisplay extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.createChart()
  }

  componentDidUpdate() {
    this.createChart()
  }

  render() {
    const [xSize, ySize] = this.props.size
    return <svg ref={(node) => {this.node = node}} width={xSize} height={ySize}></svg>
  }

  createChart() {
    const [xSize, ySize] = this.props.size

    const xMax = max(this.props.data.map(d => d.hindfoot_length))
    const yMax = max(this.props.data.map(d => d.weight))

    const xScale = scaleLinear().domain([0, xMax]).range([0, xSize])
    const yScale = scaleLinear().domain([0, yMax]).range([0, ySize])

    const r = (d, i) => 10
    const cx = (d, i) => xScale(d.hindfoot_length)
    const cy = (d, i) => yScale(d.weight)

    d3.select(this.node)
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('r', r)
      .attr('cx', cx)
      .attr('cy', cy)
  }
}

export default DataDisplay
