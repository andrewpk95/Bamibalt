import GameSettings from 'src/assets/settings';
import BaseObstacle from 'src/components/game/obstacles/base';
import { Texture } from 'src/types/image';

export default class BuildingObstacle extends BaseObstacle {
  public buildingTop: Phaser.GameObjects.Sprite;
  public buildingInside: Phaser.GameObjects.Sprite;

  protected initialize(): void {
    const buildingInside = this.scene.add.sprite(0, 0, Texture.BuildingInside)
      .setOrigin(0, 0.5);
    const buildingTop = this.scene.add.sprite(0, 0, Texture.BuildingTop)
      .setOrigin(0, 1);

    this
      .setTexture(Texture.BuildingBottom)
      .setOrigin(0, 0);

    this.buildingTop = buildingTop;
    this.buildingInside = buildingInside;
    this.scene.physics.add.existing(this, true);
    this.scene.physics.add.existing(this.buildingTop, true);

    this.scene.physics.add.collider(this.bamiko, this, (player) => {
      if (player.body.touching.right) {
        this.bamiko.splat(this.x);
      }
    });
    this.scene.physics.add.collider(this.bamiko, this.buildingTop, (player) => {
      if (player.body.touching.right) {
        this.bamiko.splat(this.x);
      }
    });
  }

  kill(): this {
    this.scene.physics.world.remove(this.buildingTop.body as Phaser.Physics.Arcade.Body);
    this.buildingTop.setActive(false);
    this.buildingTop.setVisible(false);
    this.buildingInside.setActive(false);
    this.buildingInside.setVisible(false);

    return super.kill();
  }

  reset(x: number, y: number): this {
    const { height } = GameSettings.obstacle.building;

    this.buildingTop.setPosition(x, y - height);
    this.buildingTop.setActive(true);
    this.buildingTop.setVisible(true);
    this.buildingInside.setPosition(x, y - height / 2);
    this.buildingInside.setActive(true);
    this.buildingInside.setVisible(true);
    this.scene.physics.world.add(this.buildingTop.body as Phaser.Physics.Arcade.Body);
    (this.buildingTop.body as Phaser.Physics.Arcade.Body).reset(x, y - height);

    return super.reset(x, y);
  }
}
