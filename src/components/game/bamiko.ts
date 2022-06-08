import Phaser from 'phaser';
import GameSettings from 'src/assets/settings';
import Difficulty from 'src/components/game/difficulty';

export default class Bamiko extends Phaser.GameObjects.Rectangle {
  private difficulty: Difficulty;

  private isDamaged: boolean = false;
  private isDead: boolean = false;
  private currentRecoverTime: number = 0;

  private hasDoubleJump: boolean = true;

  public get isGrounded() {
    if (!this.body) {
      return false;
    }
    return (this.body as Phaser.Physics.Arcade.Body).touching.down;
  }

  constructor(scene: Phaser.Scene, difficulty: Difficulty) {
    super(scene, 500, 500, 90, 150, 0xffffff);

    this.difficulty = difficulty;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, false);

    this.scene.input.on('pointerdown', this.jump, this);
    this.scene.events.on('update', this.update, this);
  }

  private jump() {
    if (this.isDead) {
      return;
    }
    if (this.isGrounded) {
      this.body.velocity.y = -GameSettings.bamiko.jumpVelocity;
    } else if (this.hasDoubleJump) {
      this.body.velocity.y = -GameSettings.bamiko.doubleJumpVelocity;
      this.hasDoubleJump = false;
    }
  }

  public takeDamage() {
    if (this.isDead) {
      return;
    }
    const { minSpeed } = this.difficulty.getDifficultySettings();

    if (this.isDamaged) {
      this.die();
      this.emit('damagedeath');
      return;
    }
    this.isDamaged = true;
    this.body.velocity.x = minSpeed;
    this.emit('damaged');
  }

  public splat() {
    if (this.isDead) {
      return;
    }
    this.die();
    this.emit('splatdeath');
  }

  private die() {
    this.isDead = true;
    this.scene.physics.world.remove(this.body as Phaser.Physics.Arcade.Body);
  }

  update(time: number, delta: number): void {
    if (this.isDead) {
      return;
    }
    const deltaTime = delta / 1000;

    this.updatePhysics(deltaTime);
    this.updateRecoverTime(deltaTime);
  }

  private updatePhysics(deltaTime: number) {
    const { minSpeed, maxSpeed, acceleration } = this.difficulty.getDifficultySettings();

    if (this.body.position.y > this.scene.scale.gameSize.height) {
      this.die();
      this.emit('falldeath');
      return;
    }
    if (this.isGrounded) {
      this.hasDoubleJump = true;
    }

    if (!this.isDamaged) {
      this.body.velocity.x += acceleration * deltaTime;
    }

    this.body.velocity.x = Phaser.Math.Clamp(this.body.velocity.x, minSpeed, maxSpeed);
  }

  private updateRecoverTime(deltaTime: number) {
    const { recoverTime } = this.difficulty.getDifficultySettings();

    if (!this.isDamaged) {
      return;
    }
    this.currentRecoverTime += deltaTime;

    if (this.currentRecoverTime >= recoverTime) {
      this.isDamaged = false;
      this.currentRecoverTime = 0;
      console.warn('recovered');
    }
  }

  destroy(fromScene?: boolean): void {
    this.scene.input.off('pointerdown', this.jump);
    this.scene.events.off('update', this.update);

    super.destroy(fromScene);
  }
}
