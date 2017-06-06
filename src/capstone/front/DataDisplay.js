import React from 'react'

const DataDisplay = ({data}) => {
  if (data === null) {
    return (<p>---</p>)
  }
  return (
    <p>DataDisplay with ${data.length} items</p>
  )
}

export default DataDisplay
