import Phaser from 'phaser';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle';
import BaseButton from 'src/components/buttons/baseButton';
import TextComponent from 'src/components/text';
import { UIKey } from 'src/types/ui';

type RoundRectangleButtonOptions = {
  width: number;
  height: number;
  key: UIKey;
  style: Phaser.Types.GameObjects.Text.TextStyle;
  radius?: number;
  color?: number;
  tintColor?: number;
};

export default class RoundRectangleButton extends BaseButton<RoundRectangleButtonOptions> {
  private roundRectangle: RoundRectangle;
  private text: TextComponent;
  private color: number;
  private tintColor: number;

  protected createUI({
    width, height, key, style, radius = 0, color = 0xffffff, tintColor = 0xaaaaaa,
  }: RoundRectangleButtonOptions): Phaser.GameObjects.GameObject {
    const roundRectangle = this.rexUI.add.roundRectangle(0, 0, width, height, radius, color)
      .setStrokeStyle(5, 0xbd2018);
    const text = new TextComponent(this.scene, { key, style })
      .setOrigin(0.5, 0.5);

    this.roundRectangle = roundRectangle;
    this.text = text;
    this.color = color;
    this.tintColor = tintColor;
    this
      .add(roundRectangle)
      .add(text, {
        expand: false,
      });
    return roundRectangle;
  }

  protected onButtonDown(): void {
    this.roundRectangle.fillColor = this.tintColor;
    this.text.setTint(this.tintColor);
  }

  protected onButtonUp(): void {
    this.onReset();
  }

  protected onReset(): void {
    this.roundRectangle.fillColor = this.color;
    this.text.setTint(0xffffff);
  }
}
