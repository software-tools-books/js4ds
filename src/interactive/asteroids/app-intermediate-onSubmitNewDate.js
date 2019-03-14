// ...previous code as before

  onSubmitNewDate = (text) => {
    const url = 'https://api.nasa.gov/neo/rest/v1/feed' +
                `?api_key=DEMO_KEY&start_date=${text}`
    fetch(url).then((response) => {
      return response.json()
    }).then((raw) => {
      const asteroids = this.transform(raw)
      this.setState({
        newDate: '',
        asteroids: asteroids
      })
    })
  }

//...render as before
