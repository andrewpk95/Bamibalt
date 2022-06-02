import BaseScene from 'src/scenes/base';

export default class BootScene extends BaseScene {
  constructor() {
    super({
      key: 'BootScene',
    });
  }

  preload() {
    // TODO: Load assets that needs to be loaded in LoadingScene
    this.sound.pauseOnBlur = false;
  }

  create() {
    this.scene.start('LoadingScene');
  }
}
