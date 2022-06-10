import Phaser from 'phaser';
import Bamiko from 'src/components/game/bamiko';
import BaseObstaclePool from 'src/components/game/obstaclePool/base';
import BuildingObstacle from 'src/components/game/obstacles/building';

export default class BuildingObstaclePool extends BaseObstaclePool<BuildingObstacle> {
  constructor(scene: Phaser.Scene, bamiko: Bamiko) {
    super(scene, BuildingObstacle, bamiko);

    this.group = scene.physics.add.staticGroup();
    scene.physics.add.collider(bamiko, this.group, (player, building) => {
      if (player.body.touching.right) {
        bamiko.splat(building.body.x);
      }
    });
  }

  public get(x: number, y: number, config?: any): BuildingObstacle {
    const building = super.get(x, y, config);

    this.group.add(building.buildingTop);
    return building;
  }

  public return(object: BuildingObstacle): void {
    this.group.remove(object.buildingTop);

    super.return(object);
  }
}
