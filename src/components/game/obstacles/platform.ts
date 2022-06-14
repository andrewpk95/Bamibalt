import BaseObstacle from 'src/components/game/obstacles/base';

export default class PlatformObstacle extends BaseObstacle {
  protected initialize(): void {
    this
      .setSize(400, 2)
      .setFillStyle(0x555555)
      .setOrigin(0, 0);

    this.scene.physics.add.existing(this, true);
    this.body.checkCollision.left = false;
  }
}
