import Phaser from 'phaser';
import { getText, UIKey } from 'src/types/ui';

type TextOptions = {
  x?: number;
  y?: number;
  key?: UIKey;
  string?: string;
  style?: Phaser.Types.GameObjects.Text.TextStyle;
  parameters?: object;
};

export default class TextComponent extends Phaser.GameObjects.Text {
  private key: UIKey;
  private parameters: object;

  constructor(scene: Phaser.Scene, {
    x = 0,
    y = 0,
    key,
    string = '',
    style,
    parameters,
  }: TextOptions) {
    const text = key ? getText(key, parameters) : string;

    super(scene, x, y, text, {
      fontFamily: 'Black Han Sans',
      fontStyle: '400',
      ...style,
    });

    this.key = key;
    this.parameters = parameters;
    this.scene.add.existing(this);
  }

  public setKey(key: UIKey) {
    this.key = key;
    this.setText(getText(key));
  }

  public setParameters(parameters: object) {
    if (!this.key) {
      return;
    }
    const text = getText(this.key, { ...this.parameters, ...parameters });

    this.setText(text);
  }
}
