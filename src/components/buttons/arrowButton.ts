import Phaser from 'phaser';
import BaseButton from 'src/components/buttons/baseButton';
import multiplyTintColor from 'src/util/color';

export type ArrowDirection = 'left' | 'right';

type ArrowButtonOptions = {
  width: number;
  height: number;
  direction: ArrowDirection;
  color?: number;
  strokeColor?: number;
  tintColor?: number;
};

export default class ArrowButton extends BaseButton<ArrowButtonOptions> {
  private triangle: Phaser.GameObjects.Triangle;
  private direction: ArrowDirection;
  private color: number;
  private strokeColor: number;
  private tintColor: number;

  protected createUI(options: ArrowButtonOptions): Phaser.GameObjects.GameObject {
    const triangle = this.createTriangle(options);

    triangle.setStrokeStyle(7, options.strokeColor ?? 0xbd2018);

    this.triangle = triangle;
    this.color = options.color ?? 0xffffff;
    this.strokeColor = options.strokeColor ?? 0xbd2018;
    this.tintColor = options.tintColor ?? 0xaaaaaa;
    this
      .add(triangle)
      .layout();
    return triangle;
  }

  private createTriangle({
    width, height, direction, color = 0xffffff,
  }: ArrowButtonOptions) {
    switch (direction) {
      case 'left':
        return this.scene.add.triangle(0, 0, 0, height / 2, width, height, width, 0, color);
      case 'right':
      default:
        return this.scene.add.triangle(0, 0, 0, 0, 0, height, width, height / 2, color);
    }
  }

  protected onButtonDown(): void {
    this.triangle.fillColor = multiplyTintColor(this.triangle.fillColor, this.tintColor);
    this.triangle.strokeColor = multiplyTintColor(this.triangle.strokeColor, this.tintColor);
  }

  protected onButtonUp(): void {
    this.onReset();
  }

  protected onReset(): void {
    this.triangle.fillColor = this.color;
    this.triangle.strokeColor = this.strokeColor;
  }
}
