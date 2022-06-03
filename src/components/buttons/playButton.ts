import Phaser from 'phaser';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle';
import BaseButton from 'src/components/buttons/baseButton';
import Text from 'src/components/text';

type PlayButtonOptions = {
  width: number;
  height: number;
};

export default class PlayButton extends BaseButton<PlayButtonOptions> {
  private roundRectangle: RoundRectangle;
  private text: Phaser.GameObjects.Text;

  protected createUI({ width, height }: PlayButtonOptions): Phaser.GameObjects.GameObject {
    const roundRectangle = this.rexUI.add.roundRectangle(0, 0, width, height, 5, 0xffffff);
    const text = new Text(this.scene, {
      key: 'LoadingScene_PlayButton',
      style: {
        fontSize: '50px',
        color: '#000000',
      },
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
    this.scene.scene.start('TitleScene');
  }

  protected onReset(): void {
    this.roundRectangle.fillColor = 0xffffff;
    this.text.setTint(0xffffff);
  }
}
