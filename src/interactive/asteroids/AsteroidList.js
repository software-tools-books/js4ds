import React from "react"
import ReactDOM from "react-dom"

const AsteroidList = (props) => {
  return (
    <table>
      <tbody>
      <tr>
        <th>Name</th>
        <th>Date</th>
        <th>Diameter (m)</th>
        <th>Approach (km)</th>
      </tr>
      {props.asteroids.map((a) => {
        return (
          <tr key={a.name}>
            <td>{a.name}</td>
            <td>{a.date}</td>
            <td>{a.diameter}</td>
            <td>{a.distance}</td>
          </tr>
        )
      })}
      </tbody>
    </table>
  )
}

export {AsteroidList}
