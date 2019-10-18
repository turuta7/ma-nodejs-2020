class Planet {
  constructor(planet, diametr) {
    this.planet = planet;
    this.diametr = diametr;
  }

  planetVolumeCalculation() {
    return `Planet: ${this.planet}, volume ${Math.round(
      (4 / 3) * Math.PI * (this.diametr / 2) ** 3
    )}`;
  }
}

class Earth extends Planet {
  constructor(planet, diametr, people) {
    super(planet, diametr);
    this.people = people;
  }

  outputResult() {
    return `${this.planetVolumeCalculation()}, People: ${this.people} billion`;
  }
}

const people = 7.5;

const planeta1 = new Planet("Mars", 6780);
const planeta2 = new Earth("Earth", 12742, people);

console.log(planeta1.planetVolumeCalculation());
console.log(planeta2.outputResult());
