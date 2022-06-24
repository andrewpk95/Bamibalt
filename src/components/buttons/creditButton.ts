import RoundRectangleButton from 'src/components/buttons/roundRectangleButton';
import BaseScene from 'src/scenes/base';
import PopupScene from 'src/scenes/popup';

export default class CreditButton extends RoundRectangleButton {
  constructor(scene: BaseScene) {
    super(scene, {
      width: 220,
      height: 70,
      radius: 35,
      key: 'TitleScene_Credits',
      style: {
        fontSize: '35px',
        color: '#ffffff',
      },
      color: 0x000000,
      strokeColor: 0xffffff,
      strokeThickness: 7,
    });
  }

  protected onButtonUp(): void {
    super.onButtonUp();
    PopupScene.instance.openCreditsPopup();
  }
}
