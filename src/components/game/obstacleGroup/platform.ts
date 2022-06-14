import BaseObstacleGroup from 'src/components/game/obstacleGroup/base';
import PlatformObstaclePool from 'src/components/game/obstaclePool/platform';

export default class PlatformObstacleGroup extends BaseObstacleGroup {
  public width: number = 0;
  private platformPool = new PlatformObstaclePool(this.scene, this.bamiko);

  public spawn(x: number, y: number) {
    const numPlatforms = Phaser.Math.Between(1, 3);

    for (let i = 0; i < numPlatforms; i++) {
      this.platformPool.get(x + i * (600 + 300), y + Phaser.Math.Between(-1, 1) * 100);
    }
    this.width = numPlatforms * 600 + (numPlatforms - 1) * 300;
  }
}
