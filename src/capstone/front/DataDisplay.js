import React from 'react'
import ChartistBar from 'react-chartist'

const DataDisplay = ({data}) => {
  if (data === null) {
    return (<span>---</span>)
  }
  const cleaned = data
    .map((record) => {return {x: record.weight, y: record.hindfoot_length}})
    .filter((record) => {return (record.x !== null) && (record.y !== null)})
  const series = [cleaned]
  console.log('cleaned is', cleaned)
  return (
    <ChartistBar data={{series: cleaned}} type={'Line'} />
  )
}

export default DataDisplay
