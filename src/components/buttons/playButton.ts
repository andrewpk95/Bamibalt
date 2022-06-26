import RoundRectangleButton from 'src/components/buttons/roundRectangleButton';
import BaseScene from 'src/scenes/base';

export default class PlayButton extends RoundRectangleButton {
  constructor(scene: BaseScene) {
    super(scene, {
      width: 280,
      height: 110,
      radius: 55,
      key: 'LoadingScene_PlayButton',
      style: {
        fontSize: '55px',
        color: '#ffffff',
        stroke: '#660000',
        strokeThickness: 11,
      },
      color: 0xbd2018,
      strokeColor: 0xffffff,
      strokeThickness: 7,
    });
  }

  protected onButtonUp(): void {
    super.onButtonUp();
    this.scene.input.manager.enabled = false;
    this.scene.cameras.main.fadeOut(400, 0, 0, 0);
    this.scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.input.manager.enabled = true;
      this.scene.scene.start('IntroScene');
    });
  }
}
