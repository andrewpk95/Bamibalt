import GameSettings from 'src/assets/settings';
import BaseObstacle from 'src/components/game/obstacles/base';

export default class WindowObstacle extends BaseObstacle {
  private isCrashed: boolean = false;
  private particle: Phaser.GameObjects.Particles.ParticleEmitterManager;
  private emitter: Phaser.GameObjects.Particles.ParticleEmitter;

  protected initialize(): void {
    const { height } = GameSettings.obstacle.building;

    this
      .setSize(30, height)
      .setFillStyle(0x3333ff)
      .setAlpha(0.5)
      .setOrigin(0, 0);

    this.scene.physics.add.existing(this, true);
    this.particle = this.scene.add.particles('a');
    this.emitter = this.particle.createEmitter({
      quantity: 20,
      angle: { min: -45, max: 45 },
      speed: { min: 400, max: 1000 },
      gravityY: 3000,
      lifespan: { min: 1000, max: 2000 },
      frequency: -1,
    });
  }

  public crash(speed: number) {
    if (this.isCrashed) {
      return;
    }

    this.emitter.setSpeed({ min: speed, max: speed * 2 });
    this.particle.emitParticleAt(this.x + this.width / 2, this.y + this.height / 2);
    this.isCrashed = true;
  }

  reset(x: number, y: number): this {
    this.isCrashed = false;
    return super.reset(x, y);
  }
}
