import RoundRectangleButton from 'src/components/buttons/roundRectangleButton';
import BaseScene from 'src/scenes/base';

export default class ToTitleButton extends RoundRectangleButton {
  constructor(scene: BaseScene) {
    super(scene, {
      width: 200,
      height: 100,
      radius: 10,
      key: 'ResultScene_Title_Button',
      style: {
        fontSize: '50px',
        color: '#000000',
      },
    });
  }

  protected onButtonUp(): void {
    super.onButtonUp();
    this.scene.cameras.main.fadeOut(400, 0, 0, 0);
    this.scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.scene.start('TitleScene');
    });
  }
}
