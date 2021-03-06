import Phaser from 'phaser';
import Bamiko from 'src/components/game/bamiko';
import BaseObstaclePool from 'src/components/game/obstaclePool/base';
import PlaneObstacle from 'src/components/game/obstacles/plane';

export default class PlaneObstaclePool extends BaseObstaclePool<PlaneObstacle> {
  constructor(scene: Phaser.Scene, bamiko: Bamiko) {
    super(scene, PlaneObstacle, bamiko);

    this.group = scene.physics.add.group({ allowGravity: false });
    scene.physics.add.overlap(bamiko, this.group, (player, plane: PlaneObstacle) => {
      plane.crash(player.body.velocity.x);
      this.return(plane);
      this.bamiko.takeDamage();
    });
  }
}
