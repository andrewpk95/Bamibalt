import Phaser from 'phaser';
import GameSettings from 'src/assets/settings';
import Bamiko from 'src/components/game/bamiko';
import Difficulty from 'src/components/game/difficulty';

export default class Yuri extends Phaser.GameObjects.Rectangle {
  private bamiko: Bamiko;
  private difficulty: Difficulty;
  private positions: Phaser.Math.Vector2[] = [];
  private frameOffset: number;

  constructor(scene: Phaser.Scene, bamiko: Bamiko, difficulty: Difficulty) {
    super(scene, -300, 0, 90, 150, 0xffaaaa);

    this.bamiko = bamiko;
    this.difficulty = difficulty;
    this.setOrigin(0, 0);
    this.scene.add.existing(this);

    this.scene.events.on('update', this.update, this);
    this.difficulty.on('levelup', this.handleLevelUp, this);
    this.handleLevelUp();
  }

  private handleLevelUp() {
    const { followDistance } = GameSettings.yuri;
    const { minSpeed } = this.difficulty.getDifficultySettings();
    const fps = this.scene.game.loop.targetFps;
    const frameOffset = Math.round((followDistance / minSpeed) * fps);

    this.frameOffset = frameOffset;
  }

  update(): void {
    this.positions.push(new Phaser.Math.Vector2(this.bamiko.body.position));

    let nextPosition: Phaser.Math.Vector2;

    while (this.positions.length > this.frameOffset) {
      nextPosition = this.positions.shift();
    }

    if (nextPosition) {
      this.setPosition(nextPosition.x, nextPosition.y);
    }
  }

  destroy(fromScene?: boolean): void {
    this.scene.events.off('update', this.update);

    super.destroy(fromScene);
  }
}
