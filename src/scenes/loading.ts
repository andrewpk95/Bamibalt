import PlayButton from 'src/components/buttons/playButton';
import BaseScene from 'src/scenes/base';
import GameUIScene from 'src/scenes/gameUI';
import PopupScene from 'src/scenes/popup';

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

    this.scene.add('GameUIScene', GameUIScene, true);
    this.scene.add('PopupScene', PopupScene, true);
  }
}
