import OverlapSizer from 'phaser3-rex-plugins/templates/ui/overlapsizer/OverlapSizer';
import CreditButton from 'src/components/buttons/creditButton';
import DescriptionButton from 'src/components/buttons/descriptionButton';
import StartButton from 'src/components/buttons/startButton';
import TextComponent from 'src/components/text';
import ModeSelector from 'src/components/ui/modeSelector';
import TitleText from 'src/components/ui/titleText';
import BaseScene from 'src/scenes/base';
import { Texture } from 'src/types/image';
import { Music, SFX } from 'src/types/sound';
import API from 'src/util/api';

export default class TitleScene extends BaseScene {
  private isFirstTime: boolean = true;
  private tapToStart: TextComponent;
  private uiSizer: OverlapSizer;
  private highScoreText: TextComponent;

  constructor() {
    super({
      key: 'TitleScene',
    });
  }

  create() {
    const titleScreen = this.add.image(0, 0, Texture.TitleScreen);
    const tapToStart = new TextComponent(this, {
      key: 'TitleScene_Continue',
      style: {
        color: '#ffffff',
        fontSize: '50px',
        stroke: '#000000',
        strokeThickness: 6,
      },
    }).setOrigin(0.5, 0.5);
    const highScoreText = new TextComponent(this, {
      key: 'TitleScene_Highscore',
      parameters: { 0: API.getHighScore(this.registry.get('mode')) },
      style: {
        color: '#ffffff',
        fontSize: '50px',
        stroke: '#000000',
        strokeThickness: 6,
      },
    });
    const titleText = new TitleText(this);
    const startButton = new StartButton(this);
    const descriptionButton = new DescriptionButton(this);
    const modeSelector = new ModeSelector(this);
    const creditButton = new CreditButton(this);
    const centerUISizer = this.rexUI.add.sizer({
      orientation: 'vertical',
      space: {
        item: 30,
      },
    })
      .add(startButton)
      .add(descriptionButton)
      .add(modeSelector)
      .layout();
    const uiSizer = this.rexUI.add.overlapSizer({
      width: this.scale.gameSize.width,
      height: this.scale.gameSize.height,
      anchor: {
        x: 'center',
        y: 'center',
      },
    })
      .add(highScoreText, {
        align: 'left-top',
        offsetX: 50,
        offsetY: 50,
        expand: false,
      })
      .add(creditButton, {
        align: 'right-bottom',
        offsetX: -50,
        offsetY: -50,
        expand: false,
      })
      .add(centerUISizer, {
        align: 'center',
        offsetY: 300,
        expand: false,
      })
      .setVisible(false)
      .layout();

    this.tapToStart = tapToStart;
    this.uiSizer = uiSizer;
    this.highScoreText = highScoreText;

    this.rexUI.add.anchor(titleScreen, {
      x: 'center',
      y: 'center',
    });
    this.rexUI.add.anchor(titleText, {
      x: 'center',
      y: '22%',
    });
    this.rexUI.add.anchor(tapToStart, {
      x: 'center',
      y: '75%',
    });

    this.sound.play(Music.Title, { loop: true });

    if (this.isFirstTime) {
      this.input.once('pointerdown', this.handleTapToStart, this);
      this.tweens.add({
        targets: tapToStart,
        alpha: 0,
        duration: 1000,
        ease: 'Sine.easeIn',
        yoyo: true,
        repeat: -1,
      });
      this.isFirstTime = false;
    } else {
      this.tapToStart.setVisible(false);
      this.uiSizer.setVisible(true);
    }

    this.registry.events.on('changedata', this.handleChangeData, this);
    this.events.once('shutdown', () => {
      this.sound.stopByKey(Music.Title);
      this.input.off('pointerdown', this.handleTapToStart);
      this.registry.events.off('changedata', this.handleChangeData);
    });

    this.cameras.main.fadeIn(400, 0, 0, 0);
    this.tweens.createTimeline()
      .add({
        targets: titleScreen,
        scale: 1,
        duration: 12000,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1,
        onStart: () => {
          titleScreen.setScale(1.1);
        },
      })
      .play();
  }

  private handleTapToStart() {
    this.tapToStart.setVisible(false);
    this.uiSizer.setVisible(true);
    this.sound.play(SFX.Select);
  }

  private handleChangeData(_, key: string) {
    if (key === 'mode') {
      this.highScoreText.setParameters({ 0: API.getHighScore(this.registry.get('mode')) });
    }
  }
}
