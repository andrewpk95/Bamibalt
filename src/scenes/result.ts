import BaseScene from 'src/scenes/base';

export default class ResultScene extends BaseScene {
  private result: any;

  constructor() {
    super({
      key: 'ResultScene',
    });
  }

  init(data?: any) {
    if (!data) {
      throw new Error('No result data provided');
    }
    this.result = data;
  }

  create() {
    const { width, height } = this.scale.gameSize;
    const text = this.add.text(width / 2, height / 2, `Result: ${this.result}`, {
      fontSize: '100px',
    })
      .setOrigin(0.5, 0.5);

    this.rexUI.add.anchor(text, {
      x: 'center',
      y: 'center',
    });
  }
}
