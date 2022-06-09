import BaseObstacle from 'src/components/game/obstacles/base';

export default class PlaneObstacle extends BaseObstacle {
  private ground: number;
  private isFlying: boolean = false;
  private timeline: Phaser.Tweens.Timeline;

  protected initialize(): void {
    this
      .setSize(100, 75)
      .setFillStyle(0xffff33)
      .setOrigin(0, 0);

    this.scene.physics.add.existing(this, false);
  }

  update(): void {
    super.update();
    if (!this.bamiko) {
      return;
    }
    if (this.isFlying) {
      return;
    }

    if (this.x < this.bamiko.body.position.x + this.scene.scale.gameSize.width) {
      this.timeline = this.scene.tweens.createTimeline()
        .add({
          targets: this,
          y: this.ground,
          duration: 1000,
          ease: 'Quad.easeOut',
        })
        .add({
          targets: this,
          y: this.y,
          duration: 3000,
          ease: 'Quad.easeIn',
        })
        .add({
          targets: this,
          x: `-=${Phaser.Math.Between(500, 1500)}`,
          duration: 6000,
          offset: 0,
        });

      this.timeline.play();
      this.isFlying = true;
    }
  }

  kill(): this {
    super.kill();
    this.timeline?.stop();

    return this;
  }

  reset(x: number, y: number, ground: number): this {
    this.isFlying = false;
    this.ground = ground;
    return super.reset(x, y);
  }
}
