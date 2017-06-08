import React from 'react'
import {LineChart, Line, XAxis, YAxis} from 'recharts'

const PlainLines = ({data}) => {
  return (
    <LineChart width={600} height={200} data={data} margin={{top: 10, right: 10, left: 10, bottom: 10}}>
     <XAxis dataKey="x" />
     <YAxis/>
     <Line type="monotone" dataKey="y" />
    </LineChart>
  )
}

export default PlainLines
