import RoundRectangleButton from 'src/components/buttons/roundRectangleButton';
import BaseScene from 'src/scenes/base';

export default class RetryButton extends RoundRectangleButton {
  constructor(scene: BaseScene) {
    super(scene, {
      width: 200,
      height: 100,
      radius: 10,
      key: 'ResultScene_Retry_Button',
      style: {
        fontSize: '50px',
        color: '#000000',
      },
    });
  }

  protected onButtonUp(): void {
    super.onButtonUp();
    this.scene.scene.start('GameScene');
  }
}
