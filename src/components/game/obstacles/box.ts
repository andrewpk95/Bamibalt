import BaseObstacle from 'src/components/game/obstacles/base';

export default class BoxObstacle extends BaseObstacle {
  private particle: Phaser.GameObjects.Particles.ParticleEmitterManager;
  private emitter: Phaser.GameObjects.Particles.ParticleEmitter;

  protected initialize(): void {
    this
      .setSize(100, 100)
      .setFillStyle(0xff3333)
      .setOrigin(0, 0);

    this.scene.physics.add.existing(this, false);
    this.body.setSize(80, 90, false)
      .setOffset(10, 10);

    this.particle = this.scene.add.particles('a');
    this.emitter = this.particle.createEmitter({
      quantity: 1,
      angle: { min: -45, max: -30 },
      speed: { min: 400, max: 1000 },
      rotate: { start: 0, end: 720 },
      gravityY: 3000,
      lifespan: { min: 1000, max: 2000 },
      frequency: -1,
    });
  }

  public crash(speed: number) {
    this.emitter.setSpeed({ min: speed, max: speed * 2 });
    this.particle.emitParticleAt(this.x + this.width / 2, this.y + this.height / 2);
  }
}
