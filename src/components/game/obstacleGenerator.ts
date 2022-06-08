import Phaser from 'phaser';
import Bamiko from 'src/components/game/bamiko';
import BaseObstacleGroup from 'src/components/game/obstacleGroup/base';
import BoxObstacleGroup from 'src/components/game/obstacleGroup/box';
import BuildingObstacleGroup from 'src/components/game/obstacleGroup/building';
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

    const groundObstacleGroup = new GroundObstacleGroup(scene, bamiko);
    const boxObstacleGroup = new BoxObstacleGroup(scene, bamiko);
    const buildingObstacleGroup = new BuildingObstacleGroup(scene, bamiko);

    this.bamiko = bamiko;
    this.obstacleGroups = [
      groundObstacleGroup,
      boxObstacleGroup,
      buildingObstacleGroup,
    ];

    // Initial obstacle sequence
    this.spawnObstacle(buildingObstacleGroup, -700);
    this.spawnObstacle(groundObstacleGroup);

    this.scene.events.on('update', this.update, this);
  }

  update(): void {
    if (this.bamiko.x + this.scene.scale.gameSize.width > this.currentObstacleX) {
      const randomObstacleGroup = Phaser.Math.RND.pick(this.obstacleGroups);

      this.spawnObstacle(randomObstacleGroup);
    }
  }

  private spawnObstacle(obstacleGroup: BaseObstacleGroup, y?: number) {
    obstacleGroup.spawn(this.currentObstacleX, y ?? 0);
    this.currentObstacleX += obstacleGroup.width;
  }

  destroy(fromScene?: boolean): void {
    this.scene.events.off('update', this.update);

    super.destroy(fromScene);
  }
}
