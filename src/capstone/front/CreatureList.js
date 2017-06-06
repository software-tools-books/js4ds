import React from 'react'

const CreatureList = (data) => {
  return (
    <table>
      <tbody>
        <tr><th>ID</th><th>Date</th><th>Sex</th></tr>
        {data.map((item) => {
          return (
            <tr>
              <td>{item.record_id}</td>
              <td>{item.year}-{item.month}-{item.day}</td>
              <td>{item.sex}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default CreatureList
