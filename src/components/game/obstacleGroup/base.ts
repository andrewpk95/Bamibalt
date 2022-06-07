import Phaser from 'phaser';
import BaseObstacle from 'src/components/game/obstacles/base';

export default abstract class BaseObstacleGroup {
  protected scene: Phaser.Scene;
  public abstract width: number;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  public abstract spawn(x: number, y: number): BaseObstacle[];
}
