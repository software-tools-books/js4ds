import React from 'react'

const TitledField = ({label, value, onChange}) => {
  return (
    <span>
      {label}: <input type="text" value={value} onChange={(event) => onChange(event.target.value)} />
    </span>
  )
}

export default TitledField
