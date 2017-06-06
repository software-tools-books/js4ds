import React from 'react'

const SurveyStats = ({data}) => {
  return (
    <table>
      <tbody>
        <tr><th>record count</th><td>{data.record_count}</td></tr>
        <tr><th>record low</th><td>{data.record_id_low}</td></tr>
        <tr><th>record high</th><td>{data.record_id_high}</td></tr>
      </tbody>
    </table>
  )
}

export default SurveyStats
