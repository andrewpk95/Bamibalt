import Sizer from 'phaser3-rex-plugins/templates/ui/sizer/Sizer';
import { BasePopupOptions } from 'src/components/popup/basePopup';
import SizerPopup from 'src/components/popup/sizerPopup';
import TextComponent from 'src/components/text';
import BaseScene from 'src/scenes/base';

type CreditsPopupOptions = BasePopupOptions;

export default class CreditsPopup extends SizerPopup<CreditsPopupOptions> {
  private text1: TextComponent;
  private text2: TextComponent;

  constructor(scene: BaseScene) {
    super(scene, { transition: true });
  }

  protected createContent(): Sizer {
    const background = this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0xffffff)
      .setStrokeStyle(7, 0xbd2018);
    const text1 = new TextComponent(this.scene, {
      key: 'PopupScene_Credits_Content1',
      style: {
        fontSize: '40px',
        color: '#000000',
        align: 'center',
      },
    });
    const text2 = new TextComponent(this.scene, {
      key: 'PopupScene_Credits_Content2',
      style: {
        fontSize: '40px',
        color: '#000000',
        align: 'center',
      },
    });
    const sizer = this.rexUI.add.sizer({
      orientation: 'vertical',
      space: {
        top: 50,
        left: 25,
        right: 25,
        bottom: 50,
        item: 20,
      },
    })
      .addBackground(background)
      .add(text1)
      .add(text2);

    this.text1 = text1;
    this.text2 = text2;

    return sizer;
  }

  public open(): void {
    this.text1.updateText();
    this.text2.updateText();

    super.open();
  }
}
