import Phaser from 'phaser';
import Bamiko from 'src/components/game/bamiko';
import Poolable from 'src/components/objectPool/poolable';

export default abstract class BaseObstacle extends Phaser.GameObjects.Sprite implements Poolable {
  body: Phaser.Physics.Arcade.Body;

  protected bamiko: Bamiko;

  constructor(scene: Phaser.Scene, bamiko: Bamiko) {
    super(scene, 0, 0, '');
    this.name = `${Phaser.Math.Between(1, 100000000)}`;

    this.bamiko = bamiko;
    this.initialize();
    this.scene.add.existing(this);
  }

  protected abstract initialize(): void;

  update() {
    if (!this.bamiko) {
      return;
    }
    if (this.bamiko.body.position.x > this.x + this.width + this.scene.scale.gameSize.width) {
      this.emit('expired');
    }
  }

  handleUpdate = () => this.update();

  kill(): this {
    if (!this.active) {
      return this;
    }
    this.scene.events.off('update', this.handleUpdate);
    this.scene.physics.world.remove(this.body);
    this.setActive(false);
    this.setVisible(false);

    return this;
  }

  reset(x: number, y: number, config?: any): this {
    if (this.active) {
      return this;
    }
    this.setPosition(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.scene.physics.world.add(this.body);
    this.body.reset(x, y);
    this.scene.events.on('update', this.handleUpdate);

    return this;
  }

  destroy(fromScene?: boolean): void {
    if (!this.scene) {
      return;
    }
    this.scene.events.off('update', this.handleUpdate);

    super.destroy(fromScene);
  }
}
