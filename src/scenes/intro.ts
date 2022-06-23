import TextComponent from 'src/components/text';
import BaseScene from 'src/scenes/base';
import { UIKey } from 'src/types/ui';

type TextInfo = {
  key: UIKey;
  style: Phaser.Types.GameObjects.Text.TextStyle;
  duration: number;
};

type TextItem = {
  text: TextComponent;
  timeline: Phaser.Tweens.Timeline;
};

const TEXT_LIST: TextInfo[] = [
  {
    key: 'IntroScene_Content1',
    style: {
      fontSize: '40px',
      color: '#ffffff',
      align: 'center',
    },
    duration: 3000,
  },
  {
    key: 'IntroScene_Content2',
    style: {
      fontSize: '40px',
      color: '#ffffff',
      align: 'center',
    },
    duration: 1000,
  },
];

export default class IntroScene extends BaseScene {
  private texts: TextItem[] = [];
  private currentIndex: number = 0;

  constructor() {
    super({
      key: 'IntroScene',
    });
  }

  create() {
    TEXT_LIST.forEach((textInfo) => {
      const textItem = this.createTextItem(textInfo);

      this.texts.push(textItem);
    });

    if (this.texts.length > 0) {
      this.texts[0].timeline.play();
    }

    this.input.on('pointerdown', this.handleSkipText, this);

    this.events.once('shutdown', () => {
      this.input.off('pointerdown', this.handleSkipText);
    });
  }

  private createTextItem({ key, style, duration }: TextInfo): TextItem {
    const text = new TextComponent(this, { key, style })
      .setOrigin(0.5, 0.5)
      .setAlpha(0);
    const timeline = this.tweens.createTimeline()
      .add({
        targets: text,
        alpha: 1,
        duration: 1000,
      })
      .add({
        targets: text,
        alpha: 1,
        duration,
      })
      .add({
        targets: text,
        alpha: 0,
        duration: 1000,
      })
      .add({
        targets: text,
        alpha: 0,
        duration: 1000,
        onComplete: () => {
          this.next();
        },
      });

    this.rexUI.add.anchor(text, {
      x: 'center',
      y: 'center',
    });
    return { text, timeline };
  }

  private next() {
    this.currentIndex++;

    if (this.currentIndex > this.texts.length - 1) {
      this.scene.start('TitleScene');
      return;
    }

    const { timeline } = this.texts[this.currentIndex];

    timeline.play();
  }

  private handleSkipText() {
    const textInfo = this.texts[this.currentIndex];

    if (!textInfo) {
      return;
    }

    textInfo.timeline.stop();
    textInfo.text.setAlpha(0);

    this.next();
  }
}
