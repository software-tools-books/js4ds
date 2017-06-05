import React from 'react'
import * as d3 from 'd3'

export default class LineChart extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [
        [0,    60],
        [50,   30],
        [100,  10],
        [150,  50],
        [200, 275],
        [250, 375]
      ]
    }
  }

  componentDidMount() {
    const line = d3.line()

    const chart = d3.select(this.chart)
      .attr('width', 400)
      .attr('height', 400)

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
