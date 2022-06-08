import Phaser from 'phaser';
import ContainerLite from 'phaser3-rex-plugins/plugins/containerlite';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import BaseScene from 'src/scenes/base';

export type BasePopupOptions = {
  closeOnTap?: boolean;
};

export default class BasePopup extends ContainerLite {
  protected rexUI: RexUIPlugin;
  protected dimmedBackground: Phaser.GameObjects.Rectangle;

  constructor(scene: BaseScene, options: BasePopupOptions) {
    super(scene);

    this.rexUI = scene.rexUI;

    this.initializeComponents(options);
    this.setDepth(1000);
    this.scene.add.existing(this);
    this.rexUI.add.anchor(this, {
      x: 'center',
      y: 'center',
    });
  }

  protected initializeComponents({ closeOnTap = true }: BasePopupOptions) {
    const { width, height } = this.scene.scale.gameSize;

    this.dimmedBackground = this.scene.add.rectangle(
      0,
      0,
      width,
      height,
      0x000000,
    )
      .setAlpha(0.5)
      .setVisible(false)
      .setInteractive()
      .on('pointerdown', () => {
        if (closeOnTap) {
          this.close();
        }
      });

    this.addLocal(this.dimmedBackground);
  }

  public open() {
    if (!this.dimmedBackground) {
      return;
    }
    this.dimmedBackground.setVisible(true);
  }

  public close() {
    if (!this.dimmedBackground) {
      return;
    }
    this.dimmedBackground.setVisible(false);
  }
}
