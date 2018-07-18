const AsteroidList = (props) => {
  return (
    <table>
      <tr><th>Name</th><th>Date</th><th>Diameter (m)</th><th>Approach (km)</th></tr>
      {props.asteroids.map((a) => {
        return (
          <tr>
            <td>{a.name}</td>
            <td>{a.date}</td>
            <td>{a.diameter}</td>
            <td>{a.distance}</td>
          </tr>
        )
      })}
    </table>
  )
}
