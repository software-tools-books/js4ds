import React from 'react'
import TitledField from './TitledField'

const ChooseRange = ({start, onStart, count, onCount, onNewRange}) => {
  return (
    <p>
      <TitledField label='start' value={start} onChange={onStart} />
      &nbsp;&nbsp;
      <TitledField label='count' value={count} onChange={onCount} />
      &nbsp;&nbsp;
      <button onClick={(e) => onNewRange()}>update</button>
    </p>
  )
}

export default ChooseRange
