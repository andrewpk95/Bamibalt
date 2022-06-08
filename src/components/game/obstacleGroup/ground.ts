import BaseObstacleGroup from 'src/components/game/obstacleGroup/base';
import GroundObstaclePool from 'src/components/game/obstaclePool/ground';
import base from 'src/components/game/obstacles/base';

export default class GroundObstacleGroup extends BaseObstacleGroup {
  public width: number = 2400;
  private groundPool = new GroundObstaclePool(this.scene, this.bamiko);

  public spawn(x: number, y: number): base[] {
    const ground = this.groundPool.get(x, y + 1000);

    return [ground];
  }
}
