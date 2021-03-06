import BoxObstaclePool from 'src/components/game/obstaclePool/box';
import BaseObstacleGroup from 'src/components/game/obstacleGroup/base';
import GroundObstaclePool from 'src/components/game/obstaclePool/ground';

export default class BoxObstacleGroup extends BaseObstacleGroup {
  public width: number = 2000;
  private groundPool = new GroundObstaclePool(this.scene, this.bamiko);
  private boxPool = new BoxObstaclePool(this.scene, this.bamiko);

  public spawn(x: number, y: number) {
    const ground = this.groundPool.get(x, y);
    const box = this.boxPool.get(x + Phaser.Math.Between(500, 1500), y - 100);

    this.scene.physics.add.collider(ground, box);
  }
}
