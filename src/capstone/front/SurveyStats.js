import React from 'react'

const SurveyStats = ({data}) => {
  if (data === null) {
    return (<p>no data</p>)
  }
  return (
    <table>
      <tbody>
        <tr><th>record count</th><td>{data.record_count}</td></tr>
        <tr><th>year low</th><td>{data.year_low}</td></tr>
        <tr><th>year high</th><td>{data.year_high}</td></tr>
      </tbody>
    </table>
  )
}

export default SurveyStats
