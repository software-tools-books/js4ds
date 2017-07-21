import React from 'react'
import {Scatter} from 'react-chartjs-2';

const DataChart = ({data}) => {

  if (! data) {
    return (<p>no data</p>)
  }

  console.log(data)

  data = {
    datasets: [
      {
        label: 'Weight vs. Hindfoot',
        fill: false,
        showLine: false,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(255,255,255,1)',
        pointBorderWidth: 2,
        pointRadius: 5,
        data: data.map((rec) => {return {x: rec.hindfoot_avg, y: rec.weight_avg}})
      }
    ]
  }
  const options = {
    width: 600,
    height: 600,
    responsive: false,
    maintainAspectRatio: false
  }
  return (
    <Scatter data={data} options={options}/>
  )
}

export default DataChart
