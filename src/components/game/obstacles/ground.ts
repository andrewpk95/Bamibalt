import Phaser from 'phaser';
import BaseObstacle from 'src/components/game/obstacles/base';

export default class GroundObstacle extends BaseObstacle {
  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 2000, 50, 0xffffff);

    this.setOrigin(0, 0);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
  }
}
