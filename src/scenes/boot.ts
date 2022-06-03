import TextData from 'src/assets/text.json';
import BaseScene from 'src/scenes/base';

export default class BootScene extends BaseScene {
  constructor() {
    super({
      key: 'BootScene',
    });
  }

  preload() {
    const testString = [...new Set(
      Object.values(TextData)
        .map((data) => data.text)
        .join(''),
    ),
    ]
      .splice(0, 300)
      .join('');

    // @ts-ignore
    this.load.rexWebFont({
      google: {
        families: ['Black Han Sans'],
      },
      testString,
    });

    this.sound.pauseOnBlur = false;
  }

  create() {
    this.scene.start('LoadingScene');
  }
}
