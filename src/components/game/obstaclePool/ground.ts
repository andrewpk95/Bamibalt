import Phaser from 'phaser';
import Bamiko from 'src/components/game/bamiko';
import BaseObstaclePool from 'src/components/game/obstaclePool/base';
import GroundObstacle from 'src/components/game/obstacles/ground';

export default class GroundObstaclePool extends BaseObstaclePool<GroundObstacle> {
  constructor(scene: Phaser.Scene, bamiko: Bamiko) {
    super(scene, GroundObstacle, bamiko);

    this.group = scene.physics.add.staticGroup();
    scene.physics.add.collider(bamiko, this.group);
  }
}
