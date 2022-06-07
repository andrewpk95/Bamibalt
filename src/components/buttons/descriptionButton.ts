import RoundRectangleButton from 'src/components/buttons/roundRectangleButton';
import BaseScene from 'src/scenes/base';

export default class DescriptionButton extends RoundRectangleButton {
  constructor(scene: BaseScene) {
    super(scene, {
      width: 200,
      height: 100,
      radius: 10,
      key: 'TitleScene_Description',
      style: {
        fontSize: '50px',
        color: '#000000',
      },
    });
  }

  protected onButtonUp(): void {
    super.onButtonUp();
  }
}
