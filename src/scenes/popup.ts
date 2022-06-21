import CreditsPopup from 'src/components/popup/creditsPopup';
import DescriptionPopup from 'src/components/popup/descriptionPopup';
import BaseScene from 'src/scenes/base';

const SCENE_KEY = 'PopupScene';

export default class PopupScene extends BaseScene {
  public static instance: PopupScene;

  private descriptionPopup: DescriptionPopup;
  private creditsPopup: CreditsPopup;

  constructor() {
    super({
      key: SCENE_KEY,
    });

    PopupScene.instance = this;
  }

  create() {
    this.descriptionPopup = new DescriptionPopup(this);
    this.creditsPopup = new CreditsPopup(this);
  }

  public openDescriptionPopup() {
    this.descriptionPopup.open();
  }

  public openCreditsPopup() {
    this.creditsPopup.open();
  }
}
