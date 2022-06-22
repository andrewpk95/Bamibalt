import CreditButton from 'src/components/buttons/creditButton';
import DescriptionButton from 'src/components/buttons/descriptionButton';
import MuteButton from 'src/components/buttons/muteButton';
import StartButton from 'src/components/buttons/startButton';
import TextComponent from 'src/components/text';
import ModeSelector from 'src/components/ui/modeSelector';
import BaseScene from 'src/scenes/base';
import { Texture } from 'src/types/image';
import { Music } from 'src/types/sound';
import API from 'src/util/api';

export default class TitleScene extends BaseScene {
  private isTitleMusicPlayed: boolean = false;
  private highScoreText: TextComponent;

  constructor() {
    super({
      key: 'TitleScene',
    });
  }

  create() {
    const titleScreen = this.add.image(0, 0, Texture.TitleScreen);
    const highScoreText = new TextComponent(this, {
      string: `HIGH SCORE: ${API.getHighScore(this.registry.get('mode'))}`,
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
    const modeSelector = new ModeSelector(this);
    const muteButton = new MuteButton(this, {
      muteColor: 0xaaaaaa, tintColor: 0x444444,
    });
    const creditButton = new CreditButton(this);

    if (!this.isTitleMusicPlayed) {
      this.sound.play(Music.Title);
    }

    this.isTitleMusicPlayed = true;
    this.highScoreText = highScoreText;
    this.cameras.main.fadeIn(400, 0, 0, 0);

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
      .add(modeSelector)
      .layout();

    this.registry.events.on('changedata', this.handleChangeData, this);
    this.events.once('shutdown', () => {
      this.sound.stopByKey(Music.Title);
      this.registry.events.off('changedata', this.handleChangeData);
    });
  }

  private handleChangeData(_, key: string) {
    if (key === 'mode') {
      this.highScoreText.text = `HIGH SCORE: ${API.getHighScore(this.registry.get('mode'))}`;
    }
  }
}
