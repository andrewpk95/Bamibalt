import PlayButton from 'src/components/buttons/playButton';
import BaseScene from 'src/scenes/base';

export default class LoadingScene extends BaseScene {
  constructor() {
    super({
      key: 'LoadingScene',
    });
  }

  preload() {
    // TODO: Load images and sounds
  }

  create() {
    const playButton = new PlayButton(this);

    this.rexUI.add.anchor(playButton, {
      x: 'center',
      y: '100%-100',
    });
  }
}
