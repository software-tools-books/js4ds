const allNames = ['McNulty', 'Jennings', 'Snyder', 'Meltzer', 'Bilas', 'Lichterman']
ReactDOM.render(
  <ul>{allNames.map((name) => { return <ListElement name={name} /> })}</ul>,
  document.getElementById("app")
)
