import Sizer from 'phaser3-rex-plugins/templates/ui/sizer/Sizer';
import { BasePopupOptions } from 'src/components/popup/basePopup';
import SizerPopup from 'src/components/popup/sizerPopup';
import TextComponent from 'src/components/text';

type DescriptionPopupOptions = BasePopupOptions;

export default class DescriptionPopup extends SizerPopup<DescriptionPopupOptions> {
  protected createContent(): Sizer {
    const background = this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0xffffff);
    const text1 = new TextComponent(this.scene, {
      key: 'PopupScene_Description_Content1',
      style: {
        fontSize: '30px',
        color: '#000000',
      },
    });
    const text2 = new TextComponent(this.scene, {
      key: 'PopupScene_Description_Content2',
      style: {
        fontSize: '30px',
        color: '#000000',
      },
    });
    const sizer = this.rexUI.add.sizer({
      orientation: 'vertical',
      space: {
        top: 50,
        left: 20,
        right: 20,
        bottom: 50,
        item: 20,
      },
    })
      .addBackground(background)
      .add(text1)
      .add(text2);

    return sizer;
  }
}
