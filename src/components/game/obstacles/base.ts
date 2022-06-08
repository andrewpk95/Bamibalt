import Phaser from 'phaser';
import Bamiko from 'src/components/game/bamiko';
import Poolable from 'src/components/objectPool/poolable';

export default abstract class BaseObstacle
  extends Phaser.GameObjects.Rectangle implements Poolable {
  protected bamiko: Bamiko;

  constructor(scene: Phaser.Scene, bamiko: Bamiko) {
    super(scene, 0, 0);
    this.name = `${Phaser.Math.Between(1, 100000000)}`;

    this.bamiko = bamiko;
    this.initialize();
    this.scene.add.existing(this);
  }

  protected abstract initialize(): void;

  update = () => {
    if (!this.bamiko) {
      return;
    }
    if (this.bamiko.body.position.x > this.x + this.width + this.scene.scale.gameSize.width) {
      this.emit('expired');
    }
  };

  kill(): this {
    this.scene.events.off('update', this.update);
    this.scene.physics.world.remove(this.body as Phaser.Physics.Arcade.Body);
    this.setActive(false);
    this.setVisible(false);

    return this;
  }

  reset(x: number, y: number): this {
    this.setPosition(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.scene.physics.world.add(this.body as Phaser.Physics.Arcade.Body);
    (this.body as Phaser.Physics.Arcade.Body).reset(x, y);
    this.scene.events.on('update', this.update, this);

    return this;
  }

  destroy(fromScene?: boolean): void {
    this.scene.events.off('update', this.update);

    super.destroy(fromScene);
  }
}
