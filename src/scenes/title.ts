import BaseScene from 'src/scenes/base';

export default class TitleScene extends BaseScene {
  constructor() {
    super({
      key: 'TitleScene',
    });
  }

  create() {
    const { width, height } = this.scale.gameSize;
    const text = this.add.text(width / 2, height / 2, 'HELLO WORLD', {
      fontSize: '100px',
    })
      .setOrigin(0.5, 0.5);

    this.rexUI.add.anchor(text, {
      x: 'center',
      y: 'center',
    });
  }
}
