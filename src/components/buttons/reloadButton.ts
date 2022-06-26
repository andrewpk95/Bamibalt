import RoundRectangleButton from 'src/components/buttons/roundRectangleButton';
import BaseScene from 'src/scenes/base';

export default class ReloadButton extends RoundRectangleButton {
  constructor(scene: BaseScene) {
    super(scene, {
      width: 280,
      height: 110,
      radius: 55,
      key: 'LoadingScene_ReloadButton',
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
    window.location.reload();
  }
}
