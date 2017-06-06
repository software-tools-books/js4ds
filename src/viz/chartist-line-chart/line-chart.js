import React from 'react'
import ChartistGraph from 'react-chartist'

export default class LineChart extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      series: [
        [3, 9, 7, 8, 4, 6],
        [2, 1, 3, 7, 3, 6],
        [9, 3, 4, 5, 6, 6]
      ]
    }
  }

  render() {
    return (
      <ChartistGraph data={this.state} type={'Line'} />
    )
  }
}
    
