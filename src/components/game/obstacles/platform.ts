import BaseObstacle from 'src/components/game/obstacles/base';
import { Frame, Texture } from 'src/types/image';

export default class PlatformObstacle extends BaseObstacle {
  private billboard: Phaser.GameObjects.Sprite;

  protected initialize(): void {
    const billboard = this.scene.add.sprite(0, 0, Texture.Object, Frame.BillBoard)
      .setOrigin(0, 0);

    this
      .setTexture(Texture.Object, Frame.Platform)
      .setOrigin(0, 0);

    this.billboard = billboard;
    this.scene.physics.add.existing(this, true);
    this.body.checkCollision.left = false;
  }

  kill(): this {
    this.billboard.setActive(false);
    this.billboard.setVisible(false);

    return super.kill();
  }

  reset(x: number, y: number): this {
    this.billboard.setActive(true);
    this.billboard.setVisible(true);
    this.billboard.setPosition(x, y - 340);

    return super.reset(x, y);
  }
}
