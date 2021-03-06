import Phaser from 'phaser';
import Bamiko from 'src/components/game/bamiko';
import BaseObstaclePool from 'src/components/game/obstaclePool/base';
import BoxObstacle from 'src/components/game/obstacles/box';

export default class BoxObstaclePool extends BaseObstaclePool<BoxObstacle> {
  constructor(scene: Phaser.Scene, bamiko: Bamiko) {
    super(scene, BoxObstacle, bamiko);

    this.group = scene.physics.add.group();
    scene.physics.add.overlap(bamiko, this.group, (player, box: BoxObstacle) => {
      box.crash(player.body.velocity.x);
      this.return(box);
      this.bamiko.takeDamage();
    });
  }
}
