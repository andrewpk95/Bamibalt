import BaseObstacleGroup from 'src/components/game/obstacleGroup/base';
import base from 'src/components/game/obstacles/base';
import GroundObstacle from 'src/components/game/obstacles/ground';
import Pool from 'src/components/objectPool/pool';

export default class GroundObstacleGroup extends BaseObstacleGroup {
  public width: number = 2400;
  private groundPool = new Pool<GroundObstacle>(GroundObstacle, {
    initCount: 0,
    defaultArgs: [this.scene],
  });

  public spawn(x: number, y: number): base[] {
    return [this.groundPool.get(x, y)];
  }
}
