import React from "react"
import ReactDOM from "react-dom"

const DateSubmit = ({label, value, onChange, onCommit}) => {
  return (
    <p>
      {label}:
      <input type="text" value={value}
             onChange={(event) => onChange(event.target.value)} />
      <button onClick={(event) => onCommit(value)}>new</button>
    </p>
  )
}

export {DateSubmit}
