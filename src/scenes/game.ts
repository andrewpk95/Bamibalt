import Phaser from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';

export default class GameScene extends Phaser.Scene {
  public rexUI: RexUIPlugin;

  create() {
    const { width, height } = this.scale.gameSize;
    const text = this.add.text(width / 2, height / 2, 'HELLO WORLD', {
      fontSize: '100px',
    })
      .setOrigin(0.5, 0.5);

    this.rexUI.add.anchor(text, {
      x: 'center',
      y: 'center',
    });
  }
}
