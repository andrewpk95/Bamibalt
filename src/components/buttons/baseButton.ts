import Phaser from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import OverlapSizer from 'phaser3-rex-plugins/templates/ui/overlapsizer/OverlapSizer';
import BaseScene from 'src/scenes/base';

export default abstract class BaseButton<TOptions> extends OverlapSizer {
  protected rexUI: RexUIPlugin;

  protected isPressed: boolean = false;
  protected target: Phaser.GameObjects.GameObject;

  constructor(scene: BaseScene, options: TOptions) {
    super(scene);

    this.rexUI = scene.rexUI;
    this.target = this.createUI(options)
      .setInteractive()
      .on('pointerdown', this.handlePointerDown, this)
      .on('pointerup', this.handlePointerUp, this)
      .on('pointerout', this.reset, this);

    this.scene.add.existing(this);
  }

  private handlePointerDown() {
    this.onButtonDown();
    this.isPressed = true;
  }

  private handlePointerUp() {
    if (!this.isPressed) {
      return;
    }
    this.onButtonUp();
    this.isPressed = false;
  }

  private reset() {
    this.onReset();
    this.isPressed = false;
  }

  protected abstract createUI(options: TOptions): Phaser.GameObjects.GameObject;

  protected abstract onButtonDown(): void;

  protected abstract onButtonUp(): void;

  protected abstract onReset(): void;

  destroy(fromScene?: boolean): void {
    this.target.removeInteractive();

    super.destroy(fromScene);
  }
}
