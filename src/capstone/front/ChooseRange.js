import React from 'react'
import TitledField from './TitledField'

const ChooseRange = ({start, onStart, end, onEnd, onNewRange}) => {
  return (
    <p>
      <TitledField label='start' value={start} onChange={onStart} />
      &nbsp;&nbsp;
      <TitledField label='end' value={end} onChange={onEnd} />
      &nbsp;&nbsp;
      <button onClick={(e) => onNewRange()}>update</button>
    </p>
  )
}

export default ChooseRange
