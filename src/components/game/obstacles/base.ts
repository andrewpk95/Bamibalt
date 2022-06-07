import Phaser from 'phaser';
import Poolable from 'src/components/objectPool/poolable';

export default abstract class BaseObstacle
  extends Phaser.GameObjects.Rectangle implements Poolable {
  kill(): this {
    this.setActive(false);
    this.setVisible(false);

    return this;
  }

  reset(x: number, y: number): this {
    this.setActive(true);
    this.setVisible(true);
    (this.body as Phaser.Physics.Arcade.Body).reset(x, y);

    return this;
  }
}
