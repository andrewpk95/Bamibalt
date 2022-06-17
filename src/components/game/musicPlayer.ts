import Phaser from 'phaser';
import { Music } from 'src/types/sound';

export default class MusicPlayer extends Phaser.GameObjects.Container {
  private bamibalt: Phaser.Sound.BaseSound;
  private yuriTheme: Phaser.Sound.BaseSound;
  private bamibaltFadeTween: Phaser.Tweens.Tween;
  private yuriThemeFadeTween: Phaser.Tweens.Tween;

  constructor(scene: Phaser.Scene) {
    super(scene);

    this.initializeComponents();
    this.scene.add.existing(this);
    this.play();
    this.yuriTheme.pause();
  }

  private initializeComponents() {
    this.bamibalt = this.scene.sound.add(Music.Bamibalt, { loop: true });
    this.yuriTheme = this.scene.sound.add(Music.Bamibalt, {
      loop: true, volume: 0, rate: 1.2, detune: 400,
    });
  }

  private getFadeInTween(target: Phaser.Sound.BaseSound) {
    return this.scene.tweens.add({
      targets: target,
      volume: 1,
      duration: 500,
    });
  }

  private getFadeOutTween(target: Phaser.Sound.BaseSound) {
    return this.scene.tweens.add({
      targets: target,
      volume: 0,
      duration: 500,
      onComplete: () => {
        target.pause();
      },
    });
  }

  private stopFadeTweens() {
    this.bamibaltFadeTween?.stop();
    this.yuriThemeFadeTween?.stop();
  }

  public play() {
    this.bamibalt.play();
    this.yuriTheme.play();
  }

  public switchToYuriTheme() {
    this.stopFadeTweens();
    this.yuriTheme.resume();
    this.bamibaltFadeTween = this.getFadeOutTween(this.bamibalt);
    this.yuriThemeFadeTween = this.getFadeInTween(this.yuriTheme);
  }

  public switchToBamibaltTheme() {
    this.stopFadeTweens();
    this.bamibalt.resume();
    this.bamibaltFadeTween = this.getFadeInTween(this.bamibalt);
    this.yuriThemeFadeTween = this.getFadeOutTween(this.yuriTheme);
  }

  public stop() {
    this.bamibalt.stop();
    this.yuriTheme.stop();
  }

  destroy(fromScene?: boolean): void {
    if (!this.scene) {
      return;
    }

    this.stop();
    super.destroy(fromScene);
  }
}
