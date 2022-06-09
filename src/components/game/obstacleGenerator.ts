import Phaser from 'phaser';
import Bamiko from 'src/components/game/bamiko';
import Difficulty from 'src/components/game/difficulty';
import BaseObstacleGroup from 'src/components/game/obstacleGroup/base';
import BoxObstacleGroup from 'src/components/game/obstacleGroup/box';
import BuildingObstacleGroup from 'src/components/game/obstacleGroup/building';
import GroundObstacleGroup from 'src/components/game/obstacleGroup/ground';
import PlaneObstacleGroup from 'src/components/game/obstacleGroup/plane';

type ObstacleGeneratorOptions = {
  bamiko: Bamiko;
  difficulty: Difficulty
};

export default class ObstacleGenerator extends Phaser.GameObjects.Container {
  private bamiko: Bamiko;
  private difficulty: Difficulty;
  private currentObstacleX: number = -300;
  private currentObstacleY: number = 1000;
  private obstacleGroups: BaseObstacleGroup[] = [];

  constructor(scene: Phaser.Scene, { bamiko, difficulty }: ObstacleGeneratorOptions) {
    super(scene);

    const groundObstacleGroup = new GroundObstacleGroup(scene, bamiko);
    const boxObstacleGroup = new BoxObstacleGroup(scene, bamiko);
    const buildingObstacleGroup = new BuildingObstacleGroup(scene, bamiko);
    const planeObstacleGroup = new PlaneObstacleGroup(scene, bamiko);

    this.bamiko = bamiko;
    this.difficulty = difficulty;
    this.obstacleGroups = [
      groundObstacleGroup,
      boxObstacleGroup,
      buildingObstacleGroup,
      planeObstacleGroup,
    ];

    // Initial obstacle sequence
    this.spawnObstacle(buildingObstacleGroup, 100);
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
    obstacleGroup.spawn(this.currentObstacleX, y ?? this.currentObstacleY);

    this.currentObstacleX += obstacleGroup.width + this.difficulty.getDifficultySettings().minSpeed;
    this.currentObstacleY += Phaser.Math.Between(-2, 2) * 100;
    this.currentObstacleY = Phaser.Math.Clamp(this.currentObstacleY, 0, 1000);
  }

  destroy(fromScene?: boolean): void {
    this.scene.events.off('update', this.update);

    super.destroy(fromScene);
  }
}
