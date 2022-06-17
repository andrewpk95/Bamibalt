import DescriptionButton from 'src/components/buttons/descriptionButton';
import MuteButton from 'src/components/buttons/muteButton';
import StartButton from 'src/components/buttons/startButton';
import TextComponent from 'src/components/text';
import BaseScene from 'src/scenes/base';
import API from 'src/util/api';

export default class TitleScene extends BaseScene {
  constructor() {
    super({
      key: 'TitleScene',
    });
  }

  create() {
    const highScoreText = new TextComponent(this, {
      string: `HIGH SCORE: ${API.getHighScore()}`,
      style: {
        fontSize: '50px',
      },
    });
    const titleText = new TextComponent(this, {
      key: 'TitleScene_Title',
      style: {
        fontSize: '150px',
      },
    })
      .setOrigin(0.5, 0.5);
    const startButton = new StartButton(this);
    const descriptionButton = new DescriptionButton(this);
    const muteButton = new MuteButton(this, {
      muteColor: 0xaaaaaa, tintColor: 0x444444,
    });

    this.rexUI.add.anchor(highScoreText, {
      left: '0%+50',
      top: '0%+50',
    });
    this.rexUI.add.anchor(muteButton, {
      right: '100%-100',
      top: '0%+100',
    });
    this.rexUI.add.sizer({
      orientation: 'vertical',
      anchor: {
        x: 'center',
        y: 'center',
      },
    })
      .add(titleText)
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
