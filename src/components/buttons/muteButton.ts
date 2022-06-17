import BaseButton from 'src/components/buttons/baseButton';
import { Frame, Texture } from 'src/types/image';

type MuteButtonOptions = {
  muteColor?: number;
  tintColor?: number;
};

export default class MuteButton extends BaseButton<MuteButtonOptions> {
  protected image: Phaser.GameObjects.Image;
  protected muteColor: number;
  protected tintColor: number;
  protected muted: boolean;

  protected createUI({
    muteColor = 0xaaaaaa, tintColor = 0x444444,
  }: MuteButtonOptions): Phaser.GameObjects.GameObject {
    const image = this.scene.add.image(0, 0, Texture.Object, Frame.Box);

    this.image = image;
    this.muteColor = muteColor;
    this.tintColor = tintColor;
    this.muted = this.scene.game.sound.mute;
    this.updateButton();

    this.add(image);
    return image;
  }

  private toggleMute() {
    this.muted = !this.muted;
    this.scene.game.sound.mute = this.muted;
    this.updateButton();
  }

  private updateButton() {
    this.image.setTint(this.muted ? this.muteColor : 0xffffff);
  }

  protected onButtonDown(): void {
    this.image.setTint(this.tintColor);
  }

  protected onButtonUp(): void {
    this.onReset();
    this.toggleMute();
  }

  protected onReset(): void {
    this.updateButton();
  }
}
