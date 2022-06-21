import RoundRectangleButton from 'src/components/buttons/roundRectangleButton';
import BaseScene from 'src/scenes/base';
import PopupScene from 'src/scenes/popup';

export default class CreditButton extends RoundRectangleButton {
  constructor(scene: BaseScene) {
    super(scene, {
      width: 220,
      height: 80,
      radius: 10,
      key: 'TitleScene_Credits',
      style: {
        fontSize: '40px',
        color: '#000000',
      },
    });
  }

  protected onButtonUp(): void {
    super.onButtonUp();
    PopupScene.instance.openCreditsPopup();
  }
}
