import Phaser from 'phaser';
import GameSettings from 'src/assets/settings';
import Difficulty from 'src/components/game/difficulty';
import { Texture } from 'src/types/image';

enum JumpState {
  None,
  Jumping,
  DoubleJumping,
}

const RUN_ANIMATION_KEY = 'bamiko_run_';
const JUMP_ANIMATION_KEY = 'bamiko_jump_';
const FALL_FRAME = 'bamiko_jump_0002';
const OUCH_FRAME = 'bamiko_ouch_0000';
const SPLAT_FRAME = 'bamiko_splat_0000';

export default class Bamiko extends Phaser.GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;
  private difficulty: Difficulty;

  private damageTween: Phaser.Tweens.Tween;
  private jumpState: JumpState = JumpState.None;
  private currentJumpTime: number = 0;
  private isDamaged: boolean = false;
  private isDead: boolean = false;
  private currentRecoverTime: number = 0;

  private hasDoubleJump: boolean = true;

  private wasGrounded: boolean = false;
  public get isGrounded() {
    if (!this.body) {
      return false;
    }
    return this.body.touching.down;
  }

  constructor(scene: Phaser.Scene, difficulty: Difficulty) {
    super(scene, 0, 0, Texture.Bamiko, OUCH_FRAME);

    this.difficulty = difficulty;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, false);

    this.setOrigin(0.5, 0.5);
    this.body.setSize(60, 130, false)
      .setOffset(30, 35);
    this.body.velocity.x = this.difficulty.getDifficultySettings().minSpeed;

    this.scene.anims.create({
      key: RUN_ANIMATION_KEY,
      frames: this.scene.anims.generateFrameNames(Texture.Bamiko, {
        prefix: RUN_ANIMATION_KEY, end: 7, zeroPad: 4,
      }),
      frameRate: 12,
      repeat: -1,
    });
    this.scene.anims.create({
      key: JUMP_ANIMATION_KEY,
      frames: this.scene.anims.generateFrameNames(Texture.Bamiko, {
        prefix: JUMP_ANIMATION_KEY, end: 2, zeroPad: 4,
      }),
      frameRate: 12,
    });

    this.scene.input.on('pointerdown', this.jump, this);
    this.scene.input.on('pointerup', this.stopJumping, this);
    this.scene.events.on('update', this.update, this);
    this.play(RUN_ANIMATION_KEY);
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
    } else {
      return;
    }

    if (!this.damageTween) {
      this.play(JUMP_ANIMATION_KEY);
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
      this.setFrame(OUCH_FRAME);
      this.emit('damagedeath');
      return;
    }

    this.damageTween?.stop();
    this.damageTween = this.scene.tweens.add({
      targets: this,
      scale: 1,
      duration: 50,
      repeat: 5,
      yoyo: true,
      onStart: () => {
        this.stop();
        this.setFrame(OUCH_FRAME);
        this.setTintFill(0xffffff);
      },
      onRepeat: () => {
        this.setTintFill(0xffffff);
      },
      onYoyo: () => {
        this.clearTint();
      },
      onComplete: () => {
        this.clearTint();
        this.damageTween = null;
        if (this.isGrounded) {
          this.play(RUN_ANIMATION_KEY);
        } else {
          this.play(FALL_FRAME);
        }
      },
    });
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
    this.setFrame(SPLAT_FRAME);
    this.emit('splatdeath');
  }

  private die() {
    this.stop();
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
    if (!this.wasGrounded && this.isGrounded) {
      this.hasDoubleJump = true;
      console.warn('grounded!');
      if (!this.damageTween) {
        this.play(RUN_ANIMATION_KEY);
      }
    } else if (this.wasGrounded && !this.isGrounded) {
      if (!this.damageTween) {
        this.play(JUMP_ANIMATION_KEY);
      }
    }
    this.wasGrounded = this.isGrounded;

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
    if (!this.scene) {
      return;
    }
    this.scene.input.off('pointerdown', this.jump);
    this.scene.input.off('pointerup', this.stopJumping);
    this.scene.events.off('update', this.update);

    super.destroy(fromScene);
  }
}
