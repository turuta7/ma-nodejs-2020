class Planet {
  constructor(planet, diameter) {
    this.planet = planet;
    this.diameter = diameter;
  }

  planetVolumeCalculation() {
    return `Planet: ${this.planet}, volume ${Math.round(
      (4 / 3) * Math.PI * (this.diameter / 2) ** 3,
    )}`;
  }
}

class Earth extends Planet {
  constructor(planet, diameter, people) {
    super(planet, diameter);
    this.people = people;
  }

  outputResult() {
    return `${this.planetVolumeCalculation()}, People: ${this.people} billion`;
  }
}

function myPlanets(planet = 'Mars', diameter = 6780, people = 0) {
  return new Earth(planet, diameter, people);
}
module.exports = myPlanets;
