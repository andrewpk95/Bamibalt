import BaseObstacle from 'src/components/game/obstacles/base';

export default class PlaneObstacle extends BaseObstacle {
  private ground: number;
  private isFlying: boolean = false;
  private timeline: Phaser.Tweens.Timeline;

  private particle: Phaser.GameObjects.Particles.ParticleEmitterManager;
  private emitter: Phaser.GameObjects.Particles.ParticleEmitter;

  protected initialize(): void {
    this
      .setSize(280, 120)
      .setFillStyle(0xffff33)
      .setOrigin(0, 0);

    this.scene.physics.add.existing(this, false);
    this.body.setSize(200, 90, false)
      .setOffset(40, 20);

    this.particle = this.scene.add.particles('a');
    this.emitter = this.particle.createEmitter({
      quantity: 1,
      angle: { min: -45, max: -30 },
      speed: { min: 400, max: 1000 },
      rotate: { start: 0, end: 360 * 10 },
      gravityY: 3000,
      lifespan: 2000,
      frequency: -1,
    });
  }

  public crash(speed: number) {
    this.emitter.setSpeed({ min: speed, max: speed * 2 });
    this.particle.emitParticleAt(this.x + this.width / 2, this.y + this.height / 2);
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
