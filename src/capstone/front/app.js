import React from 'react'
import ReactDOM from 'react-dom'
import SurveyStats from './SurveyStats'
import CreatureList from './CreatureList'

class App extends React.Component {

  constructor (props) {
    super(props)
    this.baseUrl = 'http://localhost:3418'
    this.state = {
      display: null,
      data: null
    }
  }

  componentDidMount() {
    const url = `${this.baseUrl}/survey/stats`
    fetch(url).then((response) => {
      return response.json()
    }).then((stats) => {
      this.setState({
        display: 'stats',
        data: stats
      })
    })
  }

  render = () => {
    let body = null
    switch (this.state.display) {
    case 'stats' :
      body = (<SurveyStats data={this.state.data} />)
      break
    case 'list' :
      body = (<CreatureList data={this.state.data} />)
      break
    default :
      body = (<p><em>Unknown display "{this.state.display}"</em></p>)
      break
    }
    return (
      <div>
        <h1>Creatures</h1>
        {body}
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)
