import Phaser from 'phaser';
import BaseObstacle from 'src/components/game/obstacles/base';

export default class BoxObstacle extends BaseObstacle {
  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 75, 75, 0xff3333);

    this.setOrigin(0, 0);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, false);
  }
}
