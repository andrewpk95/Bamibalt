import GameSettings from 'src/assets/settings';
import Background from 'src/components/game/background';
import Bamiko from 'src/components/game/bamiko';
import Difficulty from 'src/components/game/difficulty';
import MusicPlayer from 'src/components/game/musicPlayer';
import ObstacleGenerator from 'src/components/game/obstacleGenerator';
import Yuri from 'src/components/game/yuri';
import BaseScene from 'src/scenes/base';
import GameUIScene from 'src/scenes/gameUI';
import PopupScene from 'src/scenes/popup';
import { GameMode } from 'src/types/mode';
import { SFX } from 'src/types/sound';

export default class GameScene extends BaseScene {
  private isExtremeMode: boolean = false;
  private targetOffsetX: number;
  private currentScore: number;
  private cameraTween: Phaser.Tweens.Tween;

  private background: Background;
  private difficulty: Difficulty;
  private bamiko: Bamiko;
  private yuri: Yuri;
  private obstacleGenerator: ObstacleGenerator;
  private musicPlayer: MusicPlayer;

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  init() {
    this.cameras.main.setBackgroundColor(0xbbeeee);
    GameUIScene.instance.toggle(true);
    PopupScene.instance.setMuteButtonVisible(false);
  }

  create() {
    const isExtremeMode = this.registry.get('mode') === GameMode.Extreme;
    const background = new Background(this);
    const difficulty = new Difficulty(this);
    const bamiko = new Bamiko(this, difficulty);
    const yuri = new Yuri(this, bamiko, difficulty);
    const obstacleGenerator = new ObstacleGenerator(this, {
      bamiko, difficulty,
    });
    const musicPlayer = new MusicPlayer(this);

    this.background = background;
    this.difficulty = difficulty;
    this.bamiko = bamiko;
    this.yuri = yuri;
    this.obstacleGenerator = obstacleGenerator;
    this.musicPlayer = musicPlayer;

    this.targetOffsetX = GameSettings.camera.offsetX;
    this.cameras.main.roundPixels = true;

    this.bamiko.on('damaged', this.handleDamage, this);
    this.bamiko.on('recover', this.handleRecover, this);
    this.bamiko.on('splatdeath', this.handleSplatDeath, this);
    this.bamiko.on('damagedeath', this.handleDamageDeath, this);
    this.bamiko.on('falldeath', this.handleFallDeath, this);

    this.events.once('shutdown', () => {
      this.bamiko.off('damaged', this.handleDamage);
      this.bamiko.off('recover', this.handleRecover, this);
      this.bamiko.off('splatdeath', this.handleSplatDeath, this);
      this.bamiko.off('damagedeath', this.handleDamageDeath);
      this.bamiko.off('falldeath', this.handleFallDeath);
    });

    this.isExtremeMode = isExtremeMode;

    if (isExtremeMode) {
      this.time.delayedCall(500, () => {
        this.yuri.toggleFollow(true);
        this.musicPlayer.switchToYuriTheme();
        this.cameraTween = this.tweens.add({
          targets: this,
          targetOffsetX: GameSettings.camera.damagedOffsetX,
          duration: 500,
          ease: 'Sine.easeInOut',
        });
      });
    }
  }

  private handleDamage() {
    this.yuri.toggleFollow(true);
    this.musicPlayer.switchToYuriTheme();
    this.cameras.main.shake(250, 0.01, true);
    this.cameraTween?.stop();
    this.cameraTween = this.tweens.add({
      targets: this,
      targetOffsetX: GameSettings.camera.damagedOffsetX,
      duration: 500,
      ease: 'Sine.easeInOut',
    });
  }

  private handleRecover() {
    this.musicPlayer.switchToBamibaltTheme();
    this.cameraTween?.stop();
    this.cameraTween = this.tweens.add({
      targets: this,
      targetOffsetX: GameSettings.camera.offsetX,
      duration: 500,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        this.yuri.toggleFollow(false);
      },
    });
  }

  private handleSplatDeath() {
    this.cameras.main.shake(250, 0.01, true);
    this.musicPlayer.stop();

    if (this.bamiko.isDamaged || this.isExtremeMode) {
      this.catchDeath();
      return;
    }

    const timeline = this.tweens.createTimeline()
      .add({
        targets: this.bamiko,
        y: '+=500',
        duration: 1000,
        ease: 'Quad.easeIn',
        onComplete: () => {
          this.gameOver();
        },
      });

    timeline.play();
  }

  private handleDamageDeath() {
    this.cameras.main.shake(250, 0.01, true);
    this.musicPlayer.stop();

    this.catchDeath();
  }

  private handleFallDeath() {
    this.musicPlayer.stop();

    if (this.bamiko.isDamaged || this.isExtremeMode) {
      this.catchDeath();
      return;
    }

    const timeline = this.tweens.createTimeline()
      .add({
        targets: this.bamiko,
        y: '+=200',
        duration: 500,
        onComplete: () => {
          this.cameras.main.shake(250, 0.01, true);
          this.sound.play(SFX.Collision);
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

  private catchDeath() {
    const { followDistance } = GameSettings.yuri;
    const { maxSpeed } = this.difficulty.getDifficultySettings();
    const catchUpDuration = (followDistance / maxSpeed) * 1000;

    this.yuri.toggleFollow(false);

    const timeline = this.tweens.createTimeline()
      .add({
        targets: this.yuri,
        x: this.bamiko.x,
        y: this.bamiko.y,
        duration: catchUpDuration,
      })
      .add({
        targets: [this.bamiko, this.yuri],
        y: '-=200',
        duration: 500,
        ease: 'Quad.easeOut',
      })
      .add({
        targets: [this.bamiko, this.yuri],
        y: '+=200',
        duration: 500,
        ease: 'Quad.easeIn',
        onComplete: () => {
          this.gameOver();
        },
      })
      .add({
        targets: [this.bamiko, this.yuri],
        x: `+=${maxSpeed}`,
        angle: Phaser.Math.Between(1, 10) * 90,
        duration: 1000,
        offset: catchUpDuration,
        onStart: () => {
          this.sound.play(SFX.Collision, { detune: 500 });
        },
      });

    timeline.play();
  }

  private gameOver() {
    GameUIScene.instance.toggle(false);
    PopupScene.instance.setMuteButtonVisible(true);
    this.scene.start('ResultScene', { record: this.currentScore });
  }

  update() {
    const currentScore = Math.round(this.bamiko.body.position.x / 100);

    this.updateCamera();
    GameUIScene.instance.updateScore(currentScore);
    this.currentScore = currentScore;
  }

  private updateCamera() {
    const camera = this.cameras.main;
    const x = this.bamiko.body.position.x - this.targetOffsetX;
    const y = Math.min(this.bamiko.body.position.y - GameSettings.camera.offsetY, 0);

    camera.setScroll(x, y);
  }
}
