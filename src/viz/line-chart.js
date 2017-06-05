import React from 'react'
import * as d3 from 'd3'

export default class LineChart extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [
        [0, 6.0],
        [1, 3.0],
        [2, 1.0],
        [3, 0.5],
        [4, 0.25],
        [5, 0.125]
      ]
    }
  }

  componentDidMount() {
    const line = d3.line()

    const chart = d3.select(this.chart)
      .attr('width', window.innerWidth-100)
      .attr('height', 500)
      .append('g')
        .attr('transform', 'translate(100, 0)')

    chart
      .append('path')
        .attr('d', line(this.state.data))
  }

  render() {
    return (
      <svg ref={(r) => {this.chart = r}}></svg>
    )
  }
}
