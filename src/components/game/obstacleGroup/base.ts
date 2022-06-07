import Phaser from 'phaser';
import Bamiko from 'src/components/game/bamiko';
import BaseObstacle from 'src/components/game/obstacles/base';

export default abstract class BaseObstacleGroup {
  protected scene: Phaser.Scene;
  protected bamiko: Bamiko;
  public abstract width: number;

  constructor(scene: Phaser.Scene, bamiko: Bamiko) {
    this.scene = scene;
    this.bamiko = bamiko;
  }

  public abstract spawn(x: number, y: number): BaseObstacle[];
}
