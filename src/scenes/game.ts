import GameSettings from 'src/assets/settings';
import Bamiko from 'src/components/game/bamiko';
import Difficulty from 'src/components/game/difficulty';
import ObstacleGenerator from 'src/components/game/obstacleGenerator';
import BaseScene from 'src/scenes/base';

export default class GameScene extends BaseScene {
  private difficulty: Difficulty;
  private bamiko: Bamiko;
  private obstacleGenerator: ObstacleGenerator;

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  init() {
    this.cameras.main.setBackgroundColor(0xbbeeee);
  }

  create() {
    const difficulty = new Difficulty(this);
    const bamiko = new Bamiko(this, difficulty);
    const obstacleGenerator = new ObstacleGenerator(this, {
      bamiko,
    });

    this.difficulty = difficulty;
    this.bamiko = bamiko;
    this.obstacleGenerator = obstacleGenerator;

    this.bamiko.on('damaged', this.handleDamage, this);
    this.bamiko.on('splatdeath', this.handleSplatDeath, this);
    this.bamiko.on('damagedeath', this.handleDamageDeath, this);
    this.bamiko.on('falldeath', this.handleFallDeath, this);

    this.events.once('shutdown', () => {
      this.bamiko.off('damaged', this.handleDamage);
      this.bamiko.off('splatdeath', this.handleSplatDeath, this);
      this.bamiko.off('damagedeath', this.handleDamageDeath);
      this.bamiko.off('falldeath', this.handleFallDeath);
    });
  }

  private handleDamage() {
    console.warn('ouch');
    this.cameras.main.shake(250, 0.01, true);
  }

  private handleSplatDeath() {
    console.warn('splat');
    this.cameras.main.shake(250, 0.01, true);

    const timeline = this.tweens.createTimeline()
      .add({
        targets: this.bamiko,
        y: '+=50',
        duration: 1000,
        onComplete: () => {
          this.gameOver();
        },
      });

    timeline.play();
  }

  private handleDamageDeath() {
    console.warn('caught!');
    const timeline = this.tweens.createTimeline()
      .add({
        targets: this.bamiko,
        y: '+=200',
        duration: 500,
        onComplete: () => {
          this.cameras.main.shake(250, 0.01, true);
        },
      })
      .add({
        targets: this.bamiko,
        y: '+=200',
        duration: 500,
        onComplete: () => {
          this.gameOver();
        },
      });

    timeline.play();
  }

  private handleFallDeath() {
    console.warn('fell!');

    const timeline = this.tweens.createTimeline()
      .add({
        targets: this.bamiko,
        y: '+=200',
        duration: 500,
        onComplete: () => {
          this.cameras.main.shake(250, 0.01, true);
        },
      })
      .add({
        targets: this.bamiko,
        y: '+=200',
        duration: 500,
        onComplete: () => {
          this.gameOver();
        },
      });

    timeline.play();
  }

  private gameOver() {
    this.scene.start('ResultScene', { record: Math.round(this.bamiko.body.position.x) });
  }

  update() {
    this.updateCamera();
  }

  private updateCamera() {
    const camera = this.cameras.main;
    const x = this.bamiko.body.position.x - GameSettings.camera.offsetX;
    const y = Math.min(this.bamiko.body.position.y - GameSettings.camera.offsetY, 0);

    camera.setScroll(x, y);
  }
}
