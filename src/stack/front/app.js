import WorkshopList from './WorkshopList'
import WorkshopCreate from './WorkshopCreate'

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
    fetch(this.url).then((response) => {
      return response.json()
    }).then((initialWorkshopList) => {
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
    const params = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        workshopName: name,
        workshopDuration: duration
      })
    }
    fetch(this.url, params).then((response) => {
      return response.json()
    }).then((newWorkshop) => {
      let workshops = this.state.workshops
      workshops.push(newWorkshop)
      this.setState({
        name: '',
        duration: '',
        workshops: workshops
      })
    })
  }

  onDelete = (id) => {
    const params = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        workshopId: id
      })
    }
    const url = `${this.url}/${id}`
    fetch(url, params).then((response) => {
      return response.json()
    }).then((empty) => {
      const workshops = this.state.workshops.filter((w) => {
        return w.workshopId != id
      })
      this.setState({
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
        <WorkshopList workshops={this.state.workshops} onDelete={this.onDelete} />
      </div>
    )
  }
}
