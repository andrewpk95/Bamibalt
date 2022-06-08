import Phaser from 'phaser';
import GameSettings from 'src/assets/settings';

export default class Bamiko extends Phaser.GameObjects.Rectangle {
  private isDamaged: boolean = false;
  private hasDoubleJump: boolean = true;

  public get isGrounded() {
    if (!this.body) {
      return false;
    }
    return (this.body as Phaser.Physics.Arcade.Body).touching.down;
  }

  constructor(scene: Phaser.Scene) {
    super(scene, 500, 500, 100, 180, 0xffffff);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, false);

    this.scene.input.on('pointerdown', this.jump, this);
    this.scene.events.on('update', this.update, this);
  }

  private jump() {
    if (this.isGrounded) {
      this.body.velocity.y = -GameSettings.bamiko.jumpVelocity;
    } else if (this.hasDoubleJump) {
      this.body.velocity.y = -GameSettings.bamiko.doubleJumpVelocity;
      this.hasDoubleJump = false;
    }
  }

  public takeDamage() {
    if (this.isDamaged) {
      this.emit('damagedeath');
      return;
    }
    console.warn('ouch');
    this.isDamaged = true;
    this.emit('damaged');
  }

  update(): void {
    if (this.body.position.y > this.scene.scale.gameSize.height) {
      this.emit('falldeath');
      return;
    }
    if (this.isGrounded) {
      this.hasDoubleJump = true;
    }
    this.body.velocity.x = 700;
  }

  destroy(fromScene?: boolean): void {
    this.scene.input.off('pointerdown', this.jump);
    this.scene.events.off('update', this.update);

    super.destroy(fromScene);
  }
}
