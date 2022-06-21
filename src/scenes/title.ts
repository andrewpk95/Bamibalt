import CreditButton from 'src/components/buttons/creditButton';
import DescriptionButton from 'src/components/buttons/descriptionButton';
import MuteButton from 'src/components/buttons/muteButton';
import StartButton from 'src/components/buttons/startButton';
import TextComponent from 'src/components/text';
import BaseScene from 'src/scenes/base';
import { Texture } from 'src/types/image';
import API from 'src/util/api';

export default class TitleScene extends BaseScene {
  constructor() {
    super({
      key: 'TitleScene',
    });
  }

  create() {
    const titleScreen = this.add.image(0, 0, Texture.TitleScreen);
    const highScoreText = new TextComponent(this, {
      string: `HIGH SCORE: ${API.getHighScore()}`,
      style: {
        color: '#ffffff',
        fontSize: '50px',
        stroke: '#000000',
        strokeThickness: 6,
      },
    });
    const titleText = new TextComponent(this, {
      key: 'TitleScene_Title',
      style: {
        color: '#ffffff',
        fontSize: '180px',
        stroke: '#000000',
        strokeThickness: 20,
        shadow: {
          stroke: true,
          color: '#',
          blur: 10,
        },
      },
    })
      .setOrigin(0.5, 0.5);
    const startButton = new StartButton(this);
    const descriptionButton = new DescriptionButton(this);
    const muteButton = new MuteButton(this, {
      muteColor: 0xaaaaaa, tintColor: 0x444444,
    });
    const creditButton = new CreditButton(this);

    this.rexUI.add.anchor(titleScreen, {
      x: 'center',
      y: 'center',
    });
    this.rexUI.add.anchor(highScoreText, {
      left: '0%+50',
      top: '0%+50',
    });
    this.rexUI.add.anchor(muteButton, {
      right: '100%-100',
      top: '0%+100',
    });
    this.rexUI.add.anchor(creditButton, {
      right: '100%-50',
      bottom: '100%-50',
    });
    this.rexUI.add.anchor(titleText, {
      x: 'center',
      y: '22%',
    });
    this.rexUI.add.sizer({
      orientation: 'vertical',
      anchor: {
        x: 'center',
        y: '70%',
      },
      space: {
        item: 30,
      },
    })
      .add(startButton)
      .add(descriptionButton)
      .layout();
  }
}
