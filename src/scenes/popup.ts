import DescriptionPopup from 'src/components/popup/descriptionPopup';
import BaseScene from 'src/scenes/base';

const SCENE_KEY = 'PopupScene';

export default class PopupScene extends BaseScene {
  public static instance: PopupScene;

  private descriptionPopup: DescriptionPopup;

  constructor() {
    super({
      key: SCENE_KEY,
    });

    PopupScene.instance = this;
  }

  create() {
    this.descriptionPopup = new DescriptionPopup(this);
  }

  public openDescriptionPopup() {
    this.descriptionPopup.open();
  }
}
