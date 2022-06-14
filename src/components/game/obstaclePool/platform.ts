import Phaser from 'phaser';
import Bamiko from 'src/components/game/bamiko';
import BaseObstaclePool from 'src/components/game/obstaclePool/base';
import PlatformObstacle from 'src/components/game/obstacles/platform';

export default class PlatformObstaclePool extends BaseObstaclePool<PlatformObstacle> {
  constructor(scene: Phaser.Scene, bamiko: Bamiko) {
    super(scene, PlatformObstacle, bamiko);

    this.group = scene.physics.add.staticGroup();
    scene.physics.add.collider(
      bamiko,
      this.group,
      undefined,
      (player) => player.body.velocity.y >= 0,
    );
  }
}
