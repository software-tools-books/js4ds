import React from "react"
import ReactDOM from "react-dom"

const NumberDisplay = (props) => {
  return (<p>{props.label}: {props.value}</p>)
}

export {NumberDisplay}
