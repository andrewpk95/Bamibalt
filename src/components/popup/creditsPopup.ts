import Sizer from 'phaser3-rex-plugins/templates/ui/sizer/Sizer';
import { BasePopupOptions } from 'src/components/popup/basePopup';
import SizerPopup from 'src/components/popup/sizerPopup';
import TextComponent from 'src/components/text';
import BaseScene from 'src/scenes/base';
import { UIKey } from 'src/types/ui';

type CreditsPopupOptions = BasePopupOptions;

export default class CreditsPopup extends SizerPopup<CreditsPopupOptions> {
  private texts: TextComponent[];

  constructor(scene: BaseScene) {
    super(scene, { transition: true });
  }

  protected createContent(): Sizer {
    this.texts = [];

    const background = this.rexUI.add.roundRectangle(0, 0, 0, 0, 50, 0xffffff)
      .setStrokeStyle(10, 0xbd2018);
    const content1 = this.createCreditContent('PopupScene_Credits_Title1', 'PopupScene_Credits_Content1');
    const content2 = this.createCreditContent('PopupScene_Credits_Title2', 'PopupScene_Credits_Content2');
    const sizer = this.rexUI.add.sizer({
      orientation: 'vertical',
      space: {
        top: 50,
        left: 50,
        right: 50,
        bottom: 50,
        item: 40,
      },
    })
      .addBackground(background)
      .add(content1)
      .add(content2);

    return sizer;
  }

  private createCreditContent(titleKey: UIKey, contentKey: UIKey) {
    const title = new TextComponent(this.scene, {
      key: titleKey,
      style: {
        fontSize: '60px',
        color: '#660000',
        align: 'center',
      },
    });
    const content = new TextComponent(this.scene, {
      key: contentKey,
      style: {
        fontSize: '40px',
        color: '#000000',
        align: 'center',
      },
    });
    const sizer = this.rexUI.add.sizer({
      orientation: 'vertical',
      space: {
        item: 10,
      },
    })
      .add(title)
      .add(content);

    this.texts.push(title);
    this.texts.push(content);
    return sizer;
  }

  public open(): void {
    this.texts.forEach((text) => {
      text.updateText();
    });

    super.open();
  }
}
