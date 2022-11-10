import DiceBox from '@3d-dice/dice-box-threejs';

export default class Animacion {
  constructor(x) {
    this.Box = new DiceBox(x, {
      theme_customColorset: {
        background: '#00ffcb',
        foreground: '#ffffff',
        // texture: 'ice', // marble | ice
        material: 'glass', // metal | glass | plastic | wood
      },
      shadows: true,
      light_intensity: 0.7,
      color_spotlight: 0xefdfd5,
      gravity_multiplier: 600,
      baseScale: 100,
      strength: 2,
      // onRollComplete: results => {},
    });
  }

  init() {
    this.Box.initialize()
      .then(() => {
        // give code sandbox a chance to load up
        setTimeout(() => {
          this.roll();
          // Box.roll('7d6@4,4,4,4,4,4,4');
          // Box.roll("1d2+1d4+1d6+1d8+1d10+1d12+1d20+1d100");
        }, 1000);
      })
      .catch(e => console.error(e));
  }

  roll() {
    this.Box.roll('1dpip');
    this.Box.add('1dpip');
    return {
      d1: this.Box.diceList[0].result[0].value,
      d2: this.Box.diceList[1].result[0].value,
    };
  }
}
