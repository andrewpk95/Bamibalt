import BaseObstacle from 'src/components/game/obstacles/base';
import { Texture } from 'src/types/image';
import ZIndex from 'src/types/zIndex';

const FLY_ANIMATION_KEY = 'estelle_fly_';
const HURT_FRAME = 'estelle_hurt_0000';

export default class PlaneObstacle extends BaseObstacle {
  private ground: number;
  private isFlying: boolean = false;
  private timeline: Phaser.Tweens.Timeline;

  private particle: Phaser.GameObjects.Particles.ParticleEmitterManager;
  private emitter: Phaser.GameObjects.Particles.ParticleEmitter;

  protected initialize(): void {
    this
      .setTexture(Texture.Estelle, HURT_FRAME)
      .setOrigin(0, 0)
      .setDepth(ZIndex.Obstacles);

    this.scene.physics.add.existing(this, false);
    this.body.setSize(200, 90, false)
      .setOffset(40, 20);

    this.scene.anims.create({
      key: FLY_ANIMATION_KEY,
      frames: this.scene.anims.generateFrameNames(Texture.Estelle, {
        prefix: FLY_ANIMATION_KEY, end: 2, zeroPad: 4,
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.particle = this.scene.add.particles(Texture.Estelle, HURT_FRAME)
      .setDepth(ZIndex.Obstacles);
    this.emitter = this.particle.createEmitter({
      quantity: 1,
      angle: { min: -45, max: -30 },
      speed: { min: 400, max: 1000 },
      rotate: { start: 0, end: 360 * 8 },
      gravityY: 3000,
      lifespan: { min: 2000, max: 4000 },
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
    this.stop();

    return this;
  }

  reset(x: number, y: number, ground: number): this {
    this.isFlying = false;
    this.ground = ground;
    this.play(FLY_ANIMATION_KEY);

    return super.reset(x, y);
  }
}
