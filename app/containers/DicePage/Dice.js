import DiceBox from '@3d-dice/dice-box-threejs';

// set configurations when invoking the class

export default class Animacion {
  constructor(element) {
    this.Box = new DiceBox(element, {
      theme_customColorset: {
        // background: [
        //   "#00ffcb",
        //   "#ff6600",
        //   "#1d66af",
        //   "#7028ed",
        //   "#c4c427",
        //   "#d81128"
        // ], // randomly assigned colors
        background: '#00ffcb',
        foreground: '#ffffff',
        material: 'metal', // metal | glass | plastic | wood
      },
      // light_intensity: 1,
      gravity_multiplier: 600,
      baseScale: 100,
      strength: 2,
      onRollComplete: results => {
        console.log(`I've got results :>> `, results);
      },
    });
  }

  init() {
    this.Box.initialize()
      .then(() => {
        // give code sandbox a chance to load up
        setTimeout(() => {
          this.Box.roll('2d12');
          // Box.roll("1d2+1d4+1d6+1d8+1d10+1d12+1d20+1d100");
        }, 1000);
      })
      .catch(e => console.error(e));
  }

  roll() {
    // dynamically update the dice theme on each roll

    // all dice will produce the same value picked from the values list randomly
    const values = [1, 2, 3, 4, 5, 6];
    const randomVal = values[Math.floor(Math.random() * values.length)];

    this.Box.updateConfig({
      theme_customColorset: {
        foreground: '#ffffff',
        material: 'metal', // metal | glass | plastic | wood
      },
    });
    this.Box.roll(
      `7d6@${randomVal},${randomVal},${randomVal},${randomVal},${randomVal},${randomVal},${randomVal}`,
    );
  }
}
