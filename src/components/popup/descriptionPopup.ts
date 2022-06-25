import Sizer from 'phaser3-rex-plugins/templates/ui/sizer/Sizer';
import { BasePopupOptions } from 'src/components/popup/basePopup';
import SizerPopup from 'src/components/popup/sizerPopup';
import TextComponent from 'src/components/text';
import BaseScene from 'src/scenes/base';
import { Frame, Texture } from 'src/types/image';
import { UIKey } from 'src/types/ui';

type DescriptionPopupOptions = BasePopupOptions;

export default class DescriptionPopup extends SizerPopup<DescriptionPopupOptions> {
  private texts: TextComponent[];

  constructor(scene: BaseScene) {
    super(scene, { transition: true });
  }

  protected createContent(): Sizer {
    this.texts = [];

    const background = this.rexUI.add.roundRectangle(0, 0, 0, 0, 50, 0xffffff)
      .setStrokeStyle(10, 0xbd2018);
    const description1 = this.createDescriptionItem('PopupScene_Description_Content1', Frame.Description1);
    const description2 = this.createDescriptionItem('PopupScene_Description_Content2', Frame.Description2);
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
      .add(description1)
      .add(description2)
      .layout();

    return sizer;
  }

  private createDescriptionItem(key: UIKey, frame: Frame) {
    const text = new TextComponent(this.scene, {
      key,
      style: {
        fontSize: '40px',
        color: '#000000',
      },
    });
    const image = this.scene.add.image(0, 0, Texture.Object, frame);
    const tapFinger = this.scene.add.image(0, 0, Texture.Object, Frame.Finger);
    const imageSizer = this.rexUI.add.overlapSizer()
      .add(image, {
        align: 'center',
        expand: false,
      })
      .add(tapFinger, {
        align: 'center',
        offsetX: -image.width / 2,
        offsetY: image.height / 4,
        expand: false,
      });
    const sizer = this.rexUI.add.sizer({
      orientation: 'vertical',
      space: {
        item: 10,
      },
    })
      .add(text)
      .add(imageSizer);

    this.texts.push(text);
    return sizer;
  }

  public open(): void {
    this.texts.forEach((text) => {
      text.updateText();
    });

    super.open();
  }
}
