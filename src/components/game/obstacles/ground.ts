import BaseObstacle from 'src/components/game/obstacles/base';
import { Texture } from 'src/types/image';
import ZIndex from 'src/types/zIndex';

export default class GroundObstacle extends BaseObstacle {
  protected initialize(): void {
    this
      .setTexture(Texture.Ground)
      .setOrigin(0, 0)
      .setDepth(ZIndex.Ground);

    this.scene.physics.add.existing(this, true);
  }
}
