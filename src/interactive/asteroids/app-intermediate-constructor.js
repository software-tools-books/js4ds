class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      asteroids: [
        {name: 'a30x1000', date: '2017-03-03',
         diameter: 30, distance: 1000},
        {name: 'a5x500', date: '2017-05-05',
         diameter: 5, distance: 500},
        {name: 'a2000x200', date: '2017-02-02',
         diameter: 2000, distance: 200}
      ]
    }
  }

  // ...other code...
}
