import BaseObstacle from 'src/components/game/obstacles/base';
import { Frame, Texture } from 'src/types/image';
import ZIndex from 'src/types/zIndex';

export default class PlatformObstacle extends BaseObstacle {
  private billboard: Phaser.GameObjects.Image;
  private picture: Phaser.GameObjects.Image;

  protected initialize(): void {
    const billboard = this.scene.add.image(0, 0, Texture.Object, Frame.BillBoard)
      .setOrigin(0, 0)
      .setDepth(ZIndex.Obstacles);
    const picture = this.scene.add.image(0, 0, Texture.Object, this.getPictureFrame(1))
      .setOrigin(0, 0)
      .setDepth(ZIndex.BillboardPicture)
      .setTint(0xdddddd);

    this
      .setTexture(Texture.Object, Frame.Platform)
      .setOrigin(0, 0)
      .setDepth(ZIndex.Obstacles);

    this.billboard = billboard;
    this.picture = picture;
    this.scene.physics.add.existing(this, true);
    this.body.checkCollision.left = false;
  }

  private getPictureFrame(frame: number) {
    return `billboard_picture_0${frame}`;
  }

  kill(): this {
    this.billboard.setActive(false);
    this.billboard.setVisible(false);
    this.picture.setActive(false);
    this.picture.setVisible(false);

    return super.kill();
  }

  reset(x: number, y: number, frame: number): this {
    this.billboard.setActive(true);
    this.billboard.setVisible(true);
    this.billboard.setPosition(x, y - 340);
    this.picture.setActive(true);
    this.picture.setVisible(true);
    this.picture.setPosition(x, y - 340);
    this.picture.setFrame(this.getPictureFrame(frame));

    return super.reset(x, y);
  }
}
