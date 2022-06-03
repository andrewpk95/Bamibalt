import Text from 'src/components/text';
import BaseScene from 'src/scenes/base';

export default class TitleScene extends BaseScene {
  constructor() {
    super({
      key: 'TitleScene',
    });
  }

  create() {
    const text = new Text(this, {
      key: 'TitleScene_Title',
      style: {
        fontSize: '100px',
      },
    })
      .setOrigin(0.5, 0.5);

    this.rexUI.add.anchor(text, {
      x: 'center',
      y: 'center',
    });
  }
}
