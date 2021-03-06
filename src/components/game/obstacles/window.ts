import BaseObstacle from 'src/components/game/obstacles/base';
import { Frame, Texture } from 'src/types/image';
import { SFX } from 'src/types/sound';
import ZIndex from 'src/types/zIndex';

export default class WindowObstacle extends BaseObstacle {
  private isCrashed: boolean = false;
  private particle: Phaser.GameObjects.Particles.ParticleEmitterManager;
  private emitter: Phaser.GameObjects.Particles.ParticleEmitter;

  protected initialize(): void {
    this
      .setTexture(Texture.Object, Frame.Window)
      .setOrigin(0, 0)
      .setDepth(ZIndex.Obstacles);

    this.scene.physics.add.existing(this, true);

    this.particle = this.scene.add.particles(Texture.Object)
      .setDepth(ZIndex.Obstacles);
    this.emitter = this.particle.createEmitter({
      frame: [0, 1, 2, 3, 4].map((i) => `window_shard_0${i}`),
      quantity: 20,
      angle: { min: -45, max: 0 },
      speed: { min: 400, max: 1000 },
      rotate: { start: 0, end: 720 },
      gravityY: 3000,
      lifespan: { min: 1000, max: 2000 },
      frequency: -1,
    });
  }

  public crash(speed: number) {
    if (this.isCrashed) {
      return;
    }

    this.scene.sound.play(SFX.WindowCrash, {
      volume: Phaser.Math.RND.realInRange(0.5, 0.75),
      detune: Phaser.Math.Between(-2, 4) * 50,
    });
    this.setVisible(false);
    this.emitter.setEmitZone({ type: 'random', source: this.getBounds() });
    this.emitter.setSpeed({ min: speed, max: speed * 2 });
    this.particle.emitParticle();
    this.isCrashed = true;
  }

  reset(x: number, y: number): this {
    this.isCrashed = false;
    return super.reset(x, y);
  }
}
