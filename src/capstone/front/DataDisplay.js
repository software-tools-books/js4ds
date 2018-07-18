import React from 'react'

const DataDisplay = ({data}) => {

  if (! data) {
    return (<p>no data</p>)
  }

  const columns = [
    'year',
    'hindfoot_min',
    'hindfoot_avg',
    'hindfoot_max',
    'weight_min',
    'weight_avg',
    'weight_max'
  ]
  return (
    <table>
      <tbody>
        <tr>{columns.map((c) => (<th>{c}</th>))}</tr>
        {data.map((record) => {
          return (<tr>{columns.map((c) => (<td>{record[c]}</td>))}</tr>)
        })}
      </tbody>
    </table>
  )
}

export default DataDisplay
