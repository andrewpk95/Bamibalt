import Bamiko from 'src/components/game/bamiko';
import Difficulty from 'src/components/game/difficulty';
import BaseObstacleGroup from 'src/components/game/obstacleGroup/base';
import PlatformObstaclePool from 'src/components/game/obstaclePool/platform';

export default class PlatformObstacleGroup extends BaseObstacleGroup {
  public width: number = 0;
  private frames: number[] = [];
  private currentFrameIndex: number = 0;
  private platformPool = new PlatformObstaclePool(this.scene, this.bamiko);

  constructor(scene: Phaser.Scene, bamiko: Bamiko, difficulty: Difficulty) {
    super(scene, bamiko, difficulty);

    this.frames = Phaser.Math.RND.shuffle(Array.from({ length: 7 }, (_, i) => i + 1));
  }

  public spawn(x: number, y: number) {
    const maxLevel = this.difficulty.getMaxLevel();
    const { level, gap } = this.difficulty.getDifficultySettings();
    const numPlatforms = Phaser.Math.Between(1, Math.floor((level / maxLevel) * 3));

    this.width = 0;
    for (let i = 0; i < numPlatforms; i++) {
      const platformHeight = i > 0 ? Phaser.Math.Between(-1, 1) * 100 : 0;
      const platformGap = i > 0 ? Phaser.Math.Between(gap / 2, gap) : 0;
      const frame = this.frames[this.currentFrameIndex];

      this.platformPool.get(x + i * (600 + platformGap), y + platformHeight, frame);
      this.width += 600 + platformGap;
      this.currentFrameIndex = (this.currentFrameIndex + 1) % this.frames.length;
    }
  }
}
