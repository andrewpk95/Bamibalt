import RoundRectangleButton from 'src/components/buttons/roundRectangleButton';
import BaseScene from 'src/scenes/base';
import PopupScene from 'src/scenes/popup';
import { SFX } from 'src/types/sound';

export default class DescriptionButton extends RoundRectangleButton {
  constructor(scene: BaseScene) {
    super(scene, {
      width: 220,
      height: 90,
      radius: 45,
      key: 'TitleScene_Description',
      style: {
        fontSize: '40px',
        color: '#ffffff',
        stroke: '#660000',
        strokeThickness: 8,
      },
      color: 0xbd2018,
      strokeColor: 0xffffff,
      strokeThickness: 7,
    });
  }

  protected onButtonUp(): void {
    super.onButtonUp();
    this.scene.sound.play(SFX.ButtonClick);
    PopupScene.instance.openDescriptionPopup();
  }
}
