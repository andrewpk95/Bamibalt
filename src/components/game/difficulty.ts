import Phaser from 'phaser';
import GameSettings from 'src/assets/settings';

export default class Difficulty extends Phaser.GameObjects.Container {
  private currentTime: number = 0;
  private currentLevel: number = 1;

  constructor(scene: Phaser.Scene) {
    super(scene);

    this.scene.add.existing(this);
    this.scene.events.on('update', this.update, this);
  }

  update(time: number, delta: number): void {
    if (this.currentLevel === this.getMaxLevel()) {
      return;
    }
    const deltaTime = delta / 1000;

    this.currentTime += deltaTime;

    if (this.currentTime > this.getDifficultySettings().toNextLevelTime) {
      this.currentLevel++;
      this.currentTime = 0;
      console.warn(`level up: ${this.currentLevel}`);
      this.emit('levelup', this.currentLevel);
    }
  }

  public getDifficultySettings() {
    return GameSettings.difficulty.levels[this.currentLevel - 1];
  }

  public getMaxLevel() {
    return GameSettings.difficulty.levels.length;
  }

  destroy(fromScene?: boolean): void {
    this.scene.events.off('update', this.update);

    super.destroy(fromScene);
  }
}
