import Phaser from 'phaser';
import Bamiko from 'src/components/game/bamiko';
import Difficulty from 'src/components/game/difficulty';

export default abstract class BaseObstacleGroup {
  protected scene: Phaser.Scene;
  protected bamiko: Bamiko;
  protected difficulty: Difficulty;

  public abstract width: number;

  constructor(scene: Phaser.Scene, bamiko: Bamiko, difficulty: Difficulty) {
    this.scene = scene;
    this.bamiko = bamiko;
    this.difficulty = difficulty;
  }

  public abstract spawn(x: number, y: number): void;
}
