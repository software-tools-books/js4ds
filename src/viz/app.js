import ReactDOM from 'react-dom'
import React from 'react'
import PlainLines from './PlainLines'

const data = [
  {x: 0,   y: 60},
  {x: 50,  y: 30},
  {x: 100, y: 10},
  {x: 150, y: 50},
  {x: 200, y: 275},
  {x: 250, y: 375}
]

ReactDOM.render(
  <div>
    <h2>Plain Lines</h2>
    <PlainLines data={data} />
  </div>,
  document.getElementById(('root'))
)
