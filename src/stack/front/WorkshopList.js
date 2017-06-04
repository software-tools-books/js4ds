const WorkshopList = ({workshops, onDelete}) => {
  return (
    <table>
      <tbody>
        <tr><th>ID</th><th>Name</th><th>Duration</th></tr>
        {workshops.map((item) => {
          return (
            <tr>
              <td>{item.workshopId}</td>
              <td>{item.workshopName}</td>
              <td>{item.workshopDuration}</td>
              <td><button onClick={(event) => onDelete(item.workshopId)}>X</button></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
