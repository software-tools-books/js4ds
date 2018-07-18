class Bird {
  constructor (species) {
    this.species = species
  }

  daily (season) {
    return [
      this.foraging(season),
      this.mating(season),
      this.nesting(season)
    ]
  }

  foraging (season) {
    return `${this.species} looks for food`
  }

  mating (season) {
    let result = ''
    if (season === 'fall') {
      result = `${this.species} looks for a mate`
    }
    return result
  }

  nesting (season) {
    // do nothing
  }
}

class Penguin extends Bird {
  constructor () {
    super('penguin')
    this.hasEgg = false
  }

  mating (season) {
    if (season === 'fall') {
      this.hasEgg = Math.random() < 0.5
    }
    return super.mating(season)
  }

  nesting (season) {
    let result = ''
    if (this.hasEgg && ((season === 'winter') || (season === 'spring'))) {
      result = `${this.species} is nesting`
      if (season === 'spring') {
        this.hasEgg = false
      }
    }
    return result
  }
}

const bird = new Penguin()
const seasons = ['summer', 'fall', 'winter', 'spring']
for (let season of seasons) {
  console.log(`in ${season}: ${bird.daily(season)}`)
}
