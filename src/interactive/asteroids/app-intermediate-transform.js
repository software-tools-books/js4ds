// ...previous code as before

  transform = (raw) => {
    let result = []
    for (let key in raw.near_earth_objects) {
      raw.near_earth_objects[key].forEach((asteroid) => {
        result.push({
          name: asteroid.name,
          date: asteroid.close_approach_data[0].close_approach_date,
          diameter: asteroid.estimated_diameter.meters.estimated_diameter_max,
          distance: asteroid.close_approach_data[0].miss_distance.kilometers
        })
      })
    }
    return result
  }

// ...render as before
