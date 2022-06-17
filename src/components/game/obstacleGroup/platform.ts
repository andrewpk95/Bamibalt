import BaseObstacleGroup from 'src/components/game/obstacleGroup/base';
import PlatformObstaclePool from 'src/components/game/obstaclePool/platform';

export default class PlatformObstacleGroup extends BaseObstacleGroup {
  public width: number = 0;
  private platformPool = new PlatformObstaclePool(this.scene, this.bamiko);

  public spawn(x: number, y: number) {
    const maxLevel = this.difficulty.getMaxLevel();
    const { level, gap } = this.difficulty.getDifficultySettings();
    const numPlatforms = Phaser.Math.Between(1, Math.floor((level / maxLevel) * 3));

    this.width = 0;
    for (let i = 0; i < numPlatforms; i++) {
      const platformHeight = i > 0 ? Phaser.Math.Between(-1, 1) * 100 : 0;
      const platformGap = i > 0 ? Phaser.Math.Between(gap / 2, gap) : 0;

      this.platformPool.get(x + i * (600 + platformGap), y + platformHeight);
      this.width += 600 + platformGap;
    }
  }
}
