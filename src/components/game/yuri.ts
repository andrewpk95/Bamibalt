import Phaser from 'phaser';
import GameSettings from 'src/assets/settings';
import Bamiko from 'src/components/game/bamiko';
import Difficulty from 'src/components/game/difficulty';

export default class Yuri extends Phaser.GameObjects.Rectangle {
  private bamiko: Bamiko;
  private difficulty: Difficulty;
  private positions: Phaser.Math.Vector2[] = [];

  private isFollowing: boolean;

  constructor(scene: Phaser.Scene, bamiko: Bamiko, difficulty: Difficulty) {
    super(scene, -GameSettings.yuri.followDistance, 0, 90, 150, 0xffaaaa);

    this.bamiko = bamiko;
    this.difficulty = difficulty;
    this.scene.add.existing(this);

    this.scene.events.on('update', this.update, this);
  }

  update(time: number, delta: number): void {
    const deltaTime = delta / 1000;
    const fps = 1 / deltaTime;

    this.positions.push(new Phaser.Math.Vector2(this.bamiko.body.position));

    while (this.positions.length > fps) {
      this.positions.shift();
    }

    if (!this.isFollowing) {
      return;
    }

    const nextPosition = this.positions.find(({ x }) => {
      const { followDistance } = GameSettings.yuri;

      return this.bamiko.body.position.x - x <= followDistance;
    });

    if (nextPosition) {
      const { width, height } = this.bamiko.body;

      this.setPosition(nextPosition.x + width / 2, nextPosition.y + height / 2);
    }
  }

  public toggleFollow(follow: boolean) {
    this.isFollowing = follow;
  }

  destroy(fromScene?: boolean): void {
    this.scene.events.off('update', this.update);

    super.destroy(fromScene);
  }
}
