import React from 'react'
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'Recharts'

const orderPoints = (a, b) => {
  if (a.x < b.x) {
    return -1
  }
  else if (a.x > b.x) {
    return 1
  }
  else if (a.y < b.y) {
    return -1
  }
  else if (a.y > b.y) {
    return 1
  }
  else {
    return 0
  }
}

const DataDisplay = ({data}) => {
  if (data === null) {
    return (<span>---</span>)
  }
  const display = data
        .map((rec) => {
          return {x: rec.hindfoot_length, y: rec.weight}
        })
        .filter((rec) => {
          return (rec.x !== null) && (rec.y !== null)
        })
        .sort(orderPoints)
  console.log('min x', Math.min.apply(null, display.map((rec) => {return rec.x})),
              'max x', Math.max.apply(null, display.map((rec) => {return rec.x})))
  return (
    <ScatterChart width={600} height={600} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
      <XAxis dataKey={'x'} name='hindfoot length' unit='cm'/>
      <YAxis dataKey={'y'} name='weight' unit='kg'/>
      <Scatter name='Creatures' data={display} fill='#8884d8'/>
      <CartesianGrid />
      <Tooltip cursor={{strokeDasharray: '3 3'}}/>
    </ScatterChart>)
}

export default DataDisplay
