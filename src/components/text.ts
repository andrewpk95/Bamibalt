import Phaser from 'phaser';
import { getText, UIKey } from 'src/types/ui';

type TextOptions = {
  x?: number;
  y?: number;
  key?: UIKey;
  string?: string;
  style?: Phaser.Types.GameObjects.Text.TextStyle;
};

export default class TextComponent extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, {
    x = 0,
    y = 0,
    key,
    string = '',
    style,
  }: TextOptions) {
    const text = key ? getText(key) : string;

    super(scene, x, y, text, {
      fontFamily: 'Black Han Sans',
      fontStyle: '400',
      ...style,
    });

    this.scene.add.existing(this);
  }

  public setKey(key: UIKey) {
    this.setText(getText(key));
  }
}
