import BaseObstacle from 'src/components/game/obstacles/base';

export default class GroundObstacle extends BaseObstacle {
  protected initialize(): void {
    this
      .setSize(2000, 1000)
      .setFillStyle(0xffffff)
      .setOrigin(0, 0);

    this.scene.physics.add.existing(this, true);
  }
}
