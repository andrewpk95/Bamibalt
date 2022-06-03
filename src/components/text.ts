import Phaser from 'phaser';
import { getText, UIKey } from 'src/types/ui';

type TextOptions = {
  x?: number;
  y?: number;
  key: UIKey;
  style?: Phaser.Types.GameObjects.Text.TextStyle;
};

export default class Text extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, {
    x = 0,
    y = 0,
    key,
    style,
  }: TextOptions) {
    super(scene, x, y, getText(key), {
      fontFamily: 'Black Han Sans',
      fontStyle: '400',
      ...style,
    });

    this.scene.add.existing(this);
  }
}
