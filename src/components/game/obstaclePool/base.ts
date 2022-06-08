import Phaser from 'phaser';
import Bamiko from 'src/components/game/bamiko';
import BaseObstacle from 'src/components/game/obstacles/base';
import Pool from 'src/components/objectPool/pool';

export default abstract class BaseObstaclePool<T extends BaseObstacle> extends Pool<T> {
  protected group: Phaser.Physics.Arcade.StaticGroup | Phaser.Physics.Arcade.Group;
  protected bamiko: Bamiko;

  constructor(scene: Phaser.Scene, T: new (...args: any[]) => T, bamiko: Bamiko) {
    super(T, {
      initCount: 0,
      defaultArgs: [scene, bamiko],
    });

    this.bamiko = bamiko;
  }

  public get(x: number, y: number, config?: any) {
    const obstacle = super.get(x, y, config);

    obstacle.once('expired', () => {
      this.return(obstacle);
    });
    this.group.add(obstacle);
    return obstacle;
  }

  public return(object: T) {
    super.return(object);
    this.group.remove(object);
  }
}
