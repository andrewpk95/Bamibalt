import RetryButton from 'src/components/buttons/retryButton';
import ToTitleButton from 'src/components/buttons/toTitleButton';
import TextComponent from 'src/components/text';
import BaseScene from 'src/scenes/base';
import { Texture } from 'src/types/image';
import { getModeText } from 'src/types/mode';
import { Music } from 'src/types/sound';
import API from 'src/util/api';

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
    const score = this.result.record;
    const highScore = API.getHighScore(this.registry.get('mode'));
    const gameOverScreen = this.add.image(0, 0, Texture.GameOverScreen);
    const titleText = new TextComponent(this, {
      key: score > highScore ? 'ResultScene_Title_Highscore' : 'ResultScene_Title_Normal',
      style: {
        fontSize: '110px',
        stroke: '#000000',
        strokeThickness: 10,
      },
    });
    const modeText = new TextComponent(this, {
      key: getModeText(this.registry.get('mode')),
      style: {
        fontSize: '90px',
        stroke: '#000000',
        strokeThickness: 9,
      },
    });
    const contentText = new TextComponent(this, {
      key: 'ResultScene_Score',
      parameters: { 0: score },
      style: {
        fontSize: '80px',
        stroke: '#000000',
        strokeThickness: 8,
      },
    });

    const retryButton = new RetryButton(this);
    const toTitleButton = new ToTitleButton(this);

    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.sound.play(Music.GameOver, { loop: true });
    API.setHighScore(score, this.registry.get('mode'));

    this.rexUI.add.anchor(gameOverScreen, {
      x: 'center',
      y: 'center',
    });
    this.rexUI.add.sizer({
      orientation: 'vertical',
      anchor: {
        left: '0%+50',
        top: '0%+80',
      },
      space: {
        item: 10,
      },
    })
      .add(titleText, {
        align: 'left',
      })
      .add(modeText, {
        align: 'left',
        padding: {
          left: 40,
        },
      })
      .add(contentText, {
        align: 'left',
        padding: {
          left: 80,
        },
      })
      .layout();
    this.rexUI.add.sizer({
      orientation: 'horizontal',
      anchor: {
        right: '100%-50',
        y: '100%-80',
      },
      space: {
        item: 30,
      },
    })
      .add(retryButton)
      .add(toTitleButton)
      .layout();

    this.events.once('shutdown', () => {
      this.sound.stopByKey(Music.GameOver);
    });
  }
}
