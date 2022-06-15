import Phaser from 'phaser';
import GameSettings from 'src/assets/settings';
import Bamiko from 'src/components/game/bamiko';
import Difficulty from 'src/components/game/difficulty';
import { Texture } from 'src/types/image';

const RUN_ANIMATION_KEY = 'yuri_run_';
const JUMP_FRAME = 'yuri_jump_0000';

export default class Yuri extends Phaser.GameObjects.Sprite {
  private bamiko: Bamiko;
  private difficulty: Difficulty;
  private positions: Phaser.Math.Vector2[] = [];

  private isFollowing: boolean;

  constructor(scene: Phaser.Scene, bamiko: Bamiko, difficulty: Difficulty) {
    super(scene, -GameSettings.yuri.followDistance, 0, Texture.Yuri);

    this.bamiko = bamiko;
    this.difficulty = difficulty;
    this.scene.add.existing(this);
    this.scene.anims.create({
      key: RUN_ANIMATION_KEY,
      frames: this.scene.anims.generateFrameNames(Texture.Yuri, {
        prefix: RUN_ANIMATION_KEY, end: 7, zeroPad: 4,
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.scene.events.on('update', this.update, this);
    this.play(RUN_ANIMATION_KEY);
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

    if (follow) {
      this.play(RUN_ANIMATION_KEY);
    } else {
      this.stop();
      this.setFrame(JUMP_FRAME);
    }
  }

  destroy(fromScene?: boolean): void {
    if (!this.scene) {
      return;
    }
    this.scene.events.off('update', this.update);

    super.destroy(fromScene);
  }
}
