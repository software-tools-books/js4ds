class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      duration: '',
      workshops: []
    }
  }

  onEditName = (text) => {
    this.setState({name: text})
  }

  onEditDuration = (text) => {
    this.setState({duration: text})
  }

  onSubmit = (name, duration) => {
    const url = 'localhost:3418/workshop'
    const body = {
      workshopName: name,
      workshopDuration: duration
    }
    post(url, body).then((response) => {
      return response.json()
    }).then((workshops) => {
      this.setState({
        name: '',
        duration: '',
        workshops: workshops
      })
    })
  }

  render = () => {
    return (
      <div>
        <h1>Workshops</h1>
        <WorkshopCreate
          name={this.state.name}
          onEditName={this.onEditName}
          duration={this.state.duration}
          onEditDuration={this.onEditDuration}
          onSubmit={this.onSubmit} />
        <WorkshopList workshops={this.state.workshops} />
      </div>
    )
  }
}
