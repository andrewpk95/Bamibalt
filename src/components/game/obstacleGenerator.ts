import Phaser from 'phaser';
import Bamiko from 'src/components/game/bamiko';
import GroundObstacleGroup from 'src/components/game/obstacleGroup/ground';

type ObstacleGeneratorOptions = {
  bamiko: Bamiko;
};

export default class ObstacleGenerator extends Phaser.GameObjects.Container {
  private bamiko: Bamiko;
  private currentObstacleX: number = 0;
  private groundObstacleGroup: GroundObstacleGroup;

  constructor(scene: Phaser.Scene, { bamiko }: ObstacleGeneratorOptions) {
    super(scene);

    this.bamiko = bamiko;
    this.groundObstacleGroup = new GroundObstacleGroup(this.scene);
    this.scene.events.on('update', this.update, this);
  }

  update(): void {
    if (this.bamiko.x + this.scene.scale.gameSize.width > this.currentObstacleX) {
      const obstacles = this.groundObstacleGroup.spawn(this.currentObstacleX, 1000);

      this.scene.physics.add.collider(this.bamiko, obstacles);
      this.currentObstacleX += this.groundObstacleGroup.width;
    }
  }

  destroy(fromScene?: boolean): void {
    this.scene.events.off('update', this.update);

    super.destroy(fromScene);
  }
}
