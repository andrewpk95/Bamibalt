import BoxObstaclePool from 'src/components/game/obstaclePool/box';
import BaseObstacleGroup from 'src/components/game/obstacleGroup/base';
import base from 'src/components/game/obstacles/base';
import GroundObstaclePool from 'src/components/game/obstaclePool/ground';

export default class BoxObstacleGroup extends BaseObstacleGroup {
  public width: number = 2400;
  private groundPool = new GroundObstaclePool(this.scene, this.bamiko);
  private boxPool = new BoxObstaclePool(this.scene, this.bamiko);

  public spawn(x: number, y: number): base[] {
    const ground = this.groundPool.get(x, y + 1000);
    const box = this.boxPool.get(x + this.width / 2, y + 75);

    this.scene.physics.add.collider(ground, box);

    return [ground, box];
  }
}
