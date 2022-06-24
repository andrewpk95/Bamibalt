import RoundRectangleButton from 'src/components/buttons/roundRectangleButton';
import BaseScene from 'src/scenes/base';

export default class StartButton extends RoundRectangleButton {
  constructor(scene: BaseScene) {
    super(scene, {
      width: 260,
      height: 110,
      radius: 55,
      key: 'TitleScene_Start',
      style: {
        fontSize: '65px',
        color: '#ffffff',
        stroke: '#660000',
        strokeThickness: 13,
      },
      color: 0xbd2018,
      strokeColor: 0xffffff,
      strokeThickness: 7,
    });
  }

  protected onButtonUp(): void {
    super.onButtonUp();
    this.scene.input.mouse.enabled = false;
    this.scene.cameras.main.fadeOut(400, 0, 0, 0);
    this.scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.input.mouse.enabled = true;
      this.scene.scene.start('GameScene');
    });
  }
}
