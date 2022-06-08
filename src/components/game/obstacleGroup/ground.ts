import BaseObstacleGroup from 'src/components/game/obstacleGroup/base';
import GroundObstaclePool from 'src/components/game/obstaclePool/ground';

export default class GroundObstacleGroup extends BaseObstacleGroup {
  public width: number = 2400;
  private groundPool = new GroundObstaclePool(this.scene, this.bamiko);

  public spawn(x: number, y: number) {
    this.groundPool.get(x, y + 1000);
  }
}
