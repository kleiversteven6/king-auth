import DiceBox from './dice-box-theree';

// set configurations when invoking the class

export default class Animacion {
  constructor(element) {
    this.Box = new DiceBox(element, {
      theme_customColorset: {
        background: '#C00109',
        foreground: '#fff',
        texture: 'stainedglass',
      },
      light_intensity: 1.6,
      gravity_multiplier: 300,
      color_spotLight: '#C00109',
      baseScale: 100,
      strength: 6,
      sounds: true,
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
          this.roll();
          // Box.roll("1d2+1d4+1d6+1d8+1d10+1d12+1d20+1d100");
        }, 1000);
      })
      .catch(e => console.error(e));
  }

  async roll() {
    const resp = await this.Box.roll(`5dpip`).then(r => r);

    return resp;
  }
}
