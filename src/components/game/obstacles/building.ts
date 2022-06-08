import BaseObstacle from 'src/components/game/obstacles/base';

export default class BuildingObstacle extends BaseObstacle {
  public buildingTop: Phaser.GameObjects.Rectangle;

  protected initialize(): void {
    const buildingTop = this.scene.add.rectangle(0, 0, 2000, 1000, 0xaaaaff)
      .setOrigin(0, 1);

    this
      .setSize(2000, 1000)
      .setFillStyle(0xaaaaff)
      .setOrigin(0, 0);

    this.buildingTop = buildingTop;
    this.scene.physics.add.existing(this, true);
    this.scene.physics.add.existing(this.buildingTop, true);

    this.scene.physics.add.collider(this.bamiko, this, (player) => {
      if (player.body.touching.right) {
        this.bamiko.splat();
      }
    });
    this.scene.physics.add.collider(this.bamiko, this.buildingTop, (player) => {
      if (player.body.touching.right) {
        this.bamiko.splat();
      }
    });
  }

  kill(): this {
    this.scene.physics.world.remove(this.buildingTop.body as Phaser.Physics.Arcade.Body);
    this.buildingTop.setActive(false);
    this.buildingTop.setVisible(false);

    return super.kill();
  }

  reset(x: number, y: number): this {
    this.buildingTop.setPosition(x, y - 300);
    this.buildingTop.setActive(true);
    this.buildingTop.setVisible(true);
    this.scene.physics.world.add(this.buildingTop.body as Phaser.Physics.Arcade.Body);
    (this.buildingTop.body as Phaser.Physics.Arcade.Body).reset(x, y - 300);

    return super.reset(x, y);
  }
}
