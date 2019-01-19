import React from 'react'

const TitledField = ({label, value, onChange}) => {
  return (
    <span>
      {label}: <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    </span>
  )
}

export default TitledField
