import BaseObstacle from 'src/components/game/obstacles/base';

export default class BoxObstacle extends BaseObstacle {
  protected initialize(): void {
    this
      .setSize(75, 75)
      .setFillStyle(0xff3333)
      .setOrigin(0, 0);

    this.scene.physics.add.existing(this, false);
  }
}
