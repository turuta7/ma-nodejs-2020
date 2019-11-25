class Planet {
  constructor(planet, diameter) {
    this.planet = planet;
    this.diameter = diameter;
    this.volume = this.volume();
  }

  volume() {
    return (4 / 3) * Math.PI * (this.diameter / 2) ** 3;
  }

  planetVolumeCalculation() {
    return `Planet: ${this.planet}, volume ${this.volume}`;
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
const result = new Earth('Earth', 12742, 7.5);

module.exports = result;
