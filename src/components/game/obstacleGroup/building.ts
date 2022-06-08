import BaseObstacleGroup from 'src/components/game/obstacleGroup/base';
import BuildingObstaclePool from 'src/components/game/obstaclePool/building';

export default class BuildingObstacleGroup extends BaseObstacleGroup {
  public width: number = 2600;
  private buildingPool = new BuildingObstaclePool(this.scene, this.bamiko);

  public spawn(x: number, y: number) {
    this.buildingPool.get(x, y + 800);
  }
}
