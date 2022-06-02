import Phaser from 'phaser';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle';
import BaseButton from 'src/components/buttons/baseButton';

type PlayButtonOptions = {
  width: number;
  height: number;
};

export default class PlayButton extends BaseButton<PlayButtonOptions> {
  private roundRectangle: RoundRectangle;
  private text: Phaser.GameObjects.Text;

  protected createUI({ width, height }: PlayButtonOptions): Phaser.GameObjects.GameObject {
    const roundRectangle = this.rexUI.add.roundRectangle(0, 0, width, height, 5, 0xffffff);
    const text = this.scene.add.text(0, 0, 'PLAY', {
      fontSize: '30px',
      color: '#000000',
    })
      .setOrigin(0.5, 0.5);

    this.roundRectangle = roundRectangle;
    this.text = text;
    this
      .add(roundRectangle)
      .add(text);
    return roundRectangle;
  }

  protected onButtonDown(): void {
    this.roundRectangle.fillColor = 0xaaaaaa;
    this.text.setTint(0xaaaaaa);
  }

  protected onButtonUp(): void {
    this.onReset();
    this.scene.scene.start('GameScene');
  }

  protected onReset(): void {
    this.roundRectangle.fillColor = 0xffffff;
    this.text.setTint(0xffffff);
  }
}
