import Phaser from 'phaser';
import Bamiko from 'src/components/game/bamiko';
import BaseObstacleGroup from 'src/components/game/obstacleGroup/base';
import BoxObstacleGroup from 'src/components/game/obstacleGroup/box';
import GroundObstacleGroup from 'src/components/game/obstacleGroup/ground';

type ObstacleGeneratorOptions = {
  bamiko: Bamiko;
};

export default class ObstacleGenerator extends Phaser.GameObjects.Container {
  private bamiko: Bamiko;
  private currentObstacleX: number = 0;
  private obstacleGroups: BaseObstacleGroup[] = [];

  constructor(scene: Phaser.Scene, { bamiko }: ObstacleGeneratorOptions) {
    super(scene);

    this.bamiko = bamiko;
    this.obstacleGroups = [
      new GroundObstacleGroup(scene, bamiko),
      new BoxObstacleGroup(scene, bamiko),
    ];
    this.scene.events.on('update', this.update, this);
  }

  update(): void {
    if (this.bamiko.x + this.scene.scale.gameSize.width > this.currentObstacleX) {
      const randomObstacleGroup = Phaser.Math.RND.pick(this.obstacleGroups);

      randomObstacleGroup.spawn(this.currentObstacleX, 0);

      this.currentObstacleX += randomObstacleGroup.width;
    }
  }

  destroy(fromScene?: boolean): void {
    this.scene.events.off('update', this.update);

    super.destroy(fromScene);
  }
}
