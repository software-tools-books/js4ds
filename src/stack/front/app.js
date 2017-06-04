class App extends React.Component {

  constructor (props) {
    super(props)
    this.url = 'http://localhost:3418/workshop'
    this.state = {
      name: '',
      duration: '',
      workshops: []
    }
  }

  componentDidMount() {
    console.log(`componentDidMount...`)
    fetch(this.url).then((response) => {
      return response.json()
    }).then((initialWorkshopList) => {
      console.log(`...initialWorkshopList ${initialWorkshopList}`)
      this.setState({
        workshops: initialWorkshopList
      })
    })
  }

  onEditName = (text) => {
    this.setState({name: text})
  }

  onEditDuration = (text) => {
    this.setState({duration: text})
  }

  onSubmit = (name, duration) => {
    console.log(`onSubmit name ${name} duration ${duration}`)
    const params = {
      method: 'post',
      body: JSON.stringify({
        workshopName: name,
        workshopDuration: duration
      })
    }
    console.log('onSubmit params', params)
    fetch(this.url, params).then((response) => {
      return response.json()
    }).then((newWorkshop) => {
      const newWorkshopList = this.state.workshops.push(newWorkshop)
      this.setState({
        name: '',
        duration: '',
        workshops: newWorkshopList
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
