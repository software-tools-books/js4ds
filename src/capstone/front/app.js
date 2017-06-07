import React from 'react'
import ReactDOM from 'react-dom'
import SurveyStats from './SurveyStats'
import CreatureList from './CreatureList'
import ChooseRange from './ChooseRange'
import DataDisplay from './DataDisplay'

class App extends React.Component {

  constructor (props) {
    super(props)
    this.baseUrl = 'http://localhost:3418'
    this.state = {
      summary: null,
      start: '',
      count: '',
      data: null
    }
  }

  componentDidMount = () => {
    const url = `${this.baseUrl}/survey/stats`
    fetch(url).then((response) => {
      return response.json()
    }).then((summary) => {
      this.setState({
        summary: summary
      })
    })
  }

  onStart = (start) => {
    this.setState({
      start: start
    })
  }

  onCount = (count) => {
    this.setState({
      count: count
    })
  }

  onNewRange = () => {
    console.log(`onNewRange ${this.state.start} ${this.state.count}`)
    const params = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    const url = `${this.baseUrl}/survey/${this.state.start}/${this.state.count}`
    fetch(url, params).then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({
        data: data
      })
    })
  }

  render = () => {
    return (
      <div>
        <h1>Creatures</h1>
        <SurveyStats data={this.state.summary} />
        <ChooseRange
          start={this.state.start} onStart={this.onStart}
          count={this.state.count} onCount={this.onCount}
          onNewRange={this.onNewRange} />
        <DataDisplay data={this.state.data} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)
