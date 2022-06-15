import GameSettings from 'src/assets/settings';
import BaseObstacleGroup from 'src/components/game/obstacleGroup/base';
import BuildingObstaclePool from 'src/components/game/obstaclePool/building';
import WindowObstaclePool from 'src/components/game/obstaclePool/window';

export default class BuildingObstacleGroup extends BaseObstacleGroup {
  public width: number = 2500;
  private buildingPool = new BuildingObstaclePool(this.scene, this.bamiko);
  private windowPool = new WindowObstaclePool(this.scene, this.bamiko);

  public spawn(x: number, y: number) {
    const { height } = GameSettings.obstacle.building;

    this.buildingPool.get(x, y);
    this.windowPool.get(x, y - height);
    this.windowPool.get(x + this.width - 10, y - height);
  }
}
