import Phaser from 'phaser';
import GameSettings from 'src/assets/settings';
import Difficulty from 'src/components/game/difficulty';

enum JumpState {
  None,
  Jumping,
  DoubleJumping,
}

export default class Bamiko extends Phaser.GameObjects.Rectangle {
  body: Phaser.Physics.Arcade.Body;
  private difficulty: Difficulty;

  private jumpState: JumpState = JumpState.None;
  private currentJumpTime: number = 0;
  private isDamaged: boolean = false;
  private isDead: boolean = false;
  private currentRecoverTime: number = 0;

  private hasDoubleJump: boolean = true;

  public get isGrounded() {
    if (!this.body) {
      return false;
    }
    return this.body.touching.down;
  }

  constructor(scene: Phaser.Scene, difficulty: Difficulty) {
    super(scene, 0, 0, 90, 150, 0xffffff);

    this.difficulty = difficulty;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, false);

    this.body.velocity.x = this.difficulty.getDifficultySettings().minSpeed;
    this.scene.input.on('pointerdown', this.jump, this);
    this.scene.input.on('pointerup', this.stopJumping, this);
    this.scene.events.on('update', this.update, this);
  }

  private jump() {
    if (this.isDead) {
      return;
    }
    if (this.isGrounded) {
      this.jumpState = JumpState.Jumping;
    } else if (this.hasDoubleJump) {
      this.jumpState = JumpState.DoubleJumping;
      this.hasDoubleJump = false;
    }
  }

  private stopJumping() {
    this.jumpState = JumpState.None;
    this.currentJumpTime = 0;
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

  public splat(x: number) {
    if (this.isDead) {
      return;
    }
    this.die();
    this.setX(x - this.width / 2);
    this.emit('splatdeath');
  }

  private die() {
    this.isDead = true;
    this.scene.physics.world.remove(this.body);
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
    const { maxSpeed, acceleration } = this.difficulty.getDifficultySettings();

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

    this.body.velocity.x = Phaser.Math.Clamp(this.body.velocity.x, 0, maxSpeed);

    if (this.jumpState === JumpState.None) {
      return;
    }
    this.currentJumpTime += deltaTime;

    const jumpEndTime = this.jumpState === JumpState.Jumping
      ? GameSettings.bamiko.maxJumpDuration
      : GameSettings.bamiko.maxDoubleJumpDuration;

    if (this.currentJumpTime >= jumpEndTime) {
      this.stopJumping();
      return;
    }

    this.body.velocity.y = this.jumpState === JumpState.Jumping
      ? -GameSettings.bamiko.jumpVelocity
      : -GameSettings.bamiko.doubleJumpVelocity;
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
      this.emit('recover');
    }
  }

  destroy(fromScene?: boolean): void {
    this.scene.input.off('pointerdown', this.jump);
    this.scene.input.off('pointerup', this.stopJumping);
    this.scene.events.off('update', this.update);

    super.destroy(fromScene);
  }
}
