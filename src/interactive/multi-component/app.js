class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {counter: 0}
  }

  increment = (event) => {
    this.setState({counter: this.state.counter + 1})
  }

  decrement = (event) => {
    this.setState({counter: this.state.counter - 1})
  }

  render = () => {
    return (
      <div>
        <UpAndDown up={this.increment} down={this.decrement} />
        <NumberDisplay label='counter' value={this.state.counter} />
      </div>
    )
  }
}
