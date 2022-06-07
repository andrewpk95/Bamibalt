import DescriptionButton from 'src/components/buttons/descriptionButton';
import StartButton from 'src/components/buttons/startButton';
import TextComponent from 'src/components/text';
import BaseScene from 'src/scenes/base';

export default class TitleScene extends BaseScene {
  constructor() {
    super({
      key: 'TitleScene',
    });
  }

  create() {
    const text = new TextComponent(this, {
      key: 'TitleScene_Title',
      style: {
        fontSize: '150px',
      },
    })
      .setOrigin(0.5, 0.5);
    const startButton = new StartButton(this);
    const descriptionButton = new DescriptionButton(this);

    this.rexUI.add.sizer({
      orientation: 'vertical',
      anchor: {
        x: 'center',
        y: 'center',
      },
    })
      .add(text)
      .add(startButton, {
        padding: {
          top: 50,
        },
      })
      .add(descriptionButton, {
        padding: {
          top: 20,
        },
      })
      .layout();
  }
}
