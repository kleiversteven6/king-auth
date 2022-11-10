import DiceBox from '@3d-dice/dice-box-threejs';

// set configurations when invoking the class

export default class Animacion {
  constructor(element) {
    this.Box = new DiceBox(element, {
      gravity_multiplier: 300,
      baseScale: 100,
      strength: 6,
      onRollComplete: results => {
        this.Result = results;
      },
    });
  }

  init() {
    this.Box.initialize()
      .then(() => {
        // give code sandbox a chance to load up
        setTimeout(() => {
          this.Box.roll('2dpip');
          // Box.roll("1d2+1d4+1d6+1d8+1d10+1d12+1d20+1d100");
        }, 1000);
      })
      .catch(e => console.error(e));
  }

  roll() {
    this.Box.roll(`2dpip`);
    return this.Box.diceList;
  }
}
