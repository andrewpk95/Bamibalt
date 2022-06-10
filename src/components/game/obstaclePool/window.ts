import Phaser from 'phaser';
import Bamiko from 'src/components/game/bamiko';
import BaseObstaclePool from 'src/components/game/obstaclePool/base';
import WindowObstacle from 'src/components/game/obstacles/window';

export default class WindowObstaclePool extends BaseObstaclePool<WindowObstacle> {
  constructor(scene: Phaser.Scene, bamiko: Bamiko) {
    super(scene, WindowObstacle, bamiko);

    this.group = scene.physics.add.staticGroup();
    scene.physics.add.overlap(bamiko, this.group, (player, window: WindowObstacle) => {
      window.crash(player.body.velocity.x);
    });
  }
}
