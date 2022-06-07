import GameSettings from 'src/assets/settings';
import Bamiko from 'src/components/game/bamiko';
import ObstacleGenerator from 'src/components/game/obstacleGenerator';
import BaseScene from 'src/scenes/base';

export default class GameScene extends BaseScene {
  private bamiko: Bamiko;
  private obstacleGenerator: ObstacleGenerator;

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  create() {
    const bamiko = new Bamiko(this);
    const obstacleGenerator = new ObstacleGenerator(this, {
      bamiko,
    });

    this.bamiko = bamiko;
    this.obstacleGenerator = obstacleGenerator;
  }

  update() {
    this.updateCamera();
    this.updateBamiko();
  }

  private updateCamera() {
    const camera = this.cameras.main;
    const x = this.bamiko.x - GameSettings.camera.offsetX;
    const y = Math.min(this.bamiko.y - GameSettings.camera.offsetY, 0);

    camera.setScroll(x, y);
  }

  private updateBamiko() {
    if (this.bamiko.y > this.scale.gameSize.height) {
      this.scene.start('ResultScene', { record: this.bamiko.x });
    }
  }
}
