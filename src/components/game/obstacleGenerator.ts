import Phaser from 'phaser';
import Bamiko from 'src/components/game/bamiko';
import Difficulty from 'src/components/game/difficulty';
import BaseObstacleGroup from 'src/components/game/obstacleGroup/base';
import BoxObstacleGroup from 'src/components/game/obstacleGroup/box';
import BuildingObstacleGroup from 'src/components/game/obstacleGroup/building';
import GroundObstacleGroup from 'src/components/game/obstacleGroup/ground';
import PlaneObstacleGroup from 'src/components/game/obstacleGroup/plane';
import PlatformObstacleGroup from 'src/components/game/obstacleGroup/platform';
import { GameMode } from 'src/types/mode';

type ObstacleGeneratorOptions = {
  bamiko: Bamiko;
  difficulty: Difficulty
};

export default class ObstacleGenerator extends Phaser.GameObjects.Container {
  private bamiko: Bamiko;
  private difficulty: Difficulty;
  private currentObstacleX: number = -300;
  private currentObstacleY: number = 800;
  private obstacleGroups: BaseObstacleGroup[] = [];

  constructor(scene: Phaser.Scene, { bamiko, difficulty }: ObstacleGeneratorOptions) {
    super(scene);

    this.bamiko = bamiko;
    this.difficulty = difficulty;
    this.obstacleGroups = this.createObstacleGroup();
    this.scene.events.on('update', this.update, this);
  }

  private createObstacleGroup() {
    const groundObstacleGroup = new GroundObstacleGroup(this.scene, this.bamiko, this.difficulty);
    const boxObstacleGroup = new BoxObstacleGroup(this.scene, this.bamiko, this.difficulty);
    const buildingObstacleGroup = new BuildingObstacleGroup(this.scene, this.bamiko, this.difficulty);
    const planeObstacleGroup = new PlaneObstacleGroup(this.scene, this.bamiko, this.difficulty);
    const platformObstacleGroup = new PlatformObstacleGroup(this.scene, this.bamiko, this.difficulty);

    const currentMode: GameMode = this.scene.registry.get('mode');

    // Initial obstacle sequence
    this.spawnObstacle(buildingObstacleGroup, 100);
    this.spawnObstacle(groundObstacleGroup, 800);

    switch (currentMode) {
      case GameMode.Extreme:
        return [
          groundObstacleGroup,
          boxObstacleGroup,
          boxObstacleGroup,
          boxObstacleGroup,
          boxObstacleGroup,
          buildingObstacleGroup,
          buildingObstacleGroup,
          planeObstacleGroup,
          planeObstacleGroup,
          planeObstacleGroup,
          planeObstacleGroup,
          platformObstacleGroup,
          platformObstacleGroup,
          platformObstacleGroup,
        ];
      case GameMode.Estelle:
        return [
          groundObstacleGroup,
          boxObstacleGroup,
          buildingObstacleGroup,
          planeObstacleGroup,
          planeObstacleGroup,
          planeObstacleGroup,
          planeObstacleGroup,
          planeObstacleGroup,
          planeObstacleGroup,
          planeObstacleGroup,
          planeObstacleGroup,
          planeObstacleGroup,
          planeObstacleGroup,
          platformObstacleGroup,
        ];
      case GameMode.Classic:
      default:
        return [
          groundObstacleGroup,
          boxObstacleGroup,
          boxObstacleGroup,
          buildingObstacleGroup,
          buildingObstacleGroup,
          planeObstacleGroup,
          planeObstacleGroup,
          platformObstacleGroup,
        ];
    }
  }

  update(): void {
    if (this.bamiko.x + this.scene.scale.gameSize.width > this.currentObstacleX) {
      const randomObstacleGroup = Phaser.Math.RND.pick(this.obstacleGroups);

      this.currentObstacleY += Phaser.Math.Between(1, 4) * 50 * Phaser.Math.RND.sign();
      this.currentObstacleY = Phaser.Math.Clamp(this.currentObstacleY, 400, 1000);

      this.spawnObstacle(randomObstacleGroup);
    }
  }

  private spawnObstacle(obstacleGroup: BaseObstacleGroup, y?: number) {
    obstacleGroup.spawn(this.currentObstacleX, y ?? this.currentObstacleY);

    this.currentObstacleX += obstacleGroup.width + this.difficulty.getDifficultySettings().gap;
  }

  destroy(fromScene?: boolean): void {
    this.scene.events.off('update', this.update);

    super.destroy(fromScene);
  }
}
