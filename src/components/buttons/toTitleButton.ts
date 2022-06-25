import RoundRectangleButton from 'src/components/buttons/roundRectangleButton';
import BaseScene from 'src/scenes/base';
import { SFX } from 'src/types/sound';

export default class ToTitleButton extends RoundRectangleButton {
  constructor(scene: BaseScene) {
    super(scene, {
      width: 230,
      height: 90,
      radius: 45,
      key: 'ResultScene_Title_Button',
      style: {
        fontSize: '50px',
        color: '#000000',
      },
    });
  }

  protected onButtonUp(): void {
    super.onButtonUp();
    this.scene.sound.play(SFX.ButtonClick);
    this.scene.input.mouse.enabled = false;
    this.scene.cameras.main.fadeOut(400, 0, 0, 0);
    this.scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.input.mouse.enabled = true;
      this.scene.scene.start('TitleScene');
    });
  }
}
