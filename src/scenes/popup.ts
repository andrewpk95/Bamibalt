import MuteButton from 'src/components/buttons/muteButton';
import CreditsPopup from 'src/components/popup/creditsPopup';
import DescriptionPopup from 'src/components/popup/descriptionPopup';
import BaseScene from 'src/scenes/base';

const SCENE_KEY = 'PopupScene';

export default class PopupScene extends BaseScene {
  public static instance: PopupScene;

  private muteButton: MuteButton;
  private descriptionPopup: DescriptionPopup;
  private creditsPopup: CreditsPopup;

  constructor() {
    super({
      key: SCENE_KEY,
    });

    PopupScene.instance = this;
  }

  create() {
    this.muteButton = new MuteButton(this, {
      muteColor: 0xaaaaaa, tintColor: 0x444444,
    });
    this.descriptionPopup = new DescriptionPopup(this);
    this.creditsPopup = new CreditsPopup(this);

    this.rexUI.add.anchor(this.muteButton, {
      right: '100%-100',
      top: '0%+100',
    });
  }

  public setMuteButtonVisible(toggle: boolean) {
    this.muteButton.setVisible(toggle);
  }

  public openDescriptionPopup() {
    this.descriptionPopup.open();
  }

  public openCreditsPopup() {
    this.creditsPopup.open();
  }
}
