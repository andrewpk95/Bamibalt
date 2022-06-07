import BaseObstacleGroup from 'src/components/game/obstacleGroup/base';
import base from 'src/components/game/obstacles/base';
import BoxObstacle from 'src/components/game/obstacles/box';
import GroundObstacle from 'src/components/game/obstacles/ground';
import Pool from 'src/components/objectPool/pool';

export default class BoxObstacleGroup extends BaseObstacleGroup {
  public width: number = 2400;
  private groundPool = new Pool<GroundObstacle>(GroundObstacle, {
    initCount: 0,
    defaultArgs: [this.scene],
  });
  private boxPool = new Pool<BoxObstacle>(BoxObstacle, {
    initCount: 0,
    defaultArgs: [this.scene],
  });

  public spawn(x: number, y: number): base[] {
    const ground = this.groundPool.get(x, y + 1000);
    const box = this.boxPool.get(x + this.width / 2, y + 75);

    this.scene.physics.add.collider(this.bamiko, ground);
    this.scene.physics.add.collider(ground, box);
    const overlap = this.scene.physics.add.overlap(this.bamiko, box, () => {
      this.boxPool.return(box);
      this.bamiko.takeDamage();
      overlap.destroy();
    });
    return [ground, box];
  }
}
