import BaseObstacleGroup from 'src/components/game/obstacleGroup/base';
import GroundObstaclePool from 'src/components/game/obstaclePool/ground';
import PlaneObstaclePool from 'src/components/game/obstaclePool/plane';

export default class PlaneObstacleGroup extends BaseObstacleGroup {
  public width: number = 2000;
  private groundPool = new GroundObstaclePool(this.scene, this.bamiko);
  private planePool = new PlaneObstaclePool(this.scene, this.bamiko);

  public spawn(x: number, y: number) {
    const isAbove = Phaser.Math.Between(0, 1);
    const planeOffset = isAbove ? 100 : this.bamiko.height + 100;
    const ground = this.groundPool.get(x, y);
    const plane = this.planePool.get(x + Phaser.Math.Between(500, 1500), y - 1000, y - planeOffset);

    this.scene.physics.add.collider(ground, plane);
  }
}
