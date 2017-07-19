import React from 'react'
import ReactDOM from 'react-dom'
import {Scatter} from 'react-chartjs-2';

const data = {
  labels: ['Scatter'],
  datasets: [
    {
      label: 'Fixed Data',
      fill: false,
      showLine: false,
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(255,255,255,1)',
      pointBorderWidth: 2,
      pointRadius: 5,
      data: [
        { x: 65, y: 75 },
        { x: 59, y: 49 },
        { x: 80, y: 90 },
        { x: 81, y: 29 },
        { x: 56, y: 36 },
        { x: 55, y: 25 },
        { x: 40, y: 18 },
      ]
    }
  ]
}

class App extends React.Component {

  constructor (props) {
    super(props)
  }

  render = () => {
    return (
      <Scatter data={data} />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)
