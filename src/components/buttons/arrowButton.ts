import Phaser from 'phaser';
import BaseButton from 'src/components/buttons/baseButton';

export type ArrowDirection = 'left' | 'right';

type ArrowButtonOptions = {
  width: number;
  height: number;
  direction: ArrowDirection;
  color?: number;
  tintColor?: number;
};

export default class ArrowButton extends BaseButton<ArrowButtonOptions> {
  private triangle: Phaser.GameObjects.Triangle;
  private direction: ArrowDirection;
  private color: number;
  private tintColor: number;

  protected createUI(options: ArrowButtonOptions): Phaser.GameObjects.GameObject {
    const triangle = this.createTriangle(options);

    triangle.setStrokeStyle(5, 0xbd2018);

    this.triangle = triangle;
    this.color = options.color ?? 0xffffff;
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
    this.triangle.fillColor = this.tintColor;
  }

  protected onButtonUp(): void {
    this.onReset();
  }

  protected onReset(): void {
    this.triangle.fillColor = this.color;
  }
}
