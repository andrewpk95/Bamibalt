import Anchor from 'phaser3-rex-plugins/plugins/behaviors/anchor/Anchor';
import TextComponent from 'src/components/text';
import BaseScene from 'src/scenes/base';

export default class GameUIScene extends BaseScene {
  public static instance: GameUIScene;

  private scoreUI: Phaser.GameObjects.Text;
  private anchor: Anchor;

  constructor() {
    super({
      key: 'GameUIScene',
    });

    GameUIScene.instance = this;
  }

  create() {
    const scoreUI = new TextComponent(this, {
      style: {
        fontSize: '50px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 7,
      },
    });
    const anchor = this.rexUI.add.anchor(scoreUI, {
      top: '0%+50',
      right: '100%-50',
    });

    this.scoreUI = scoreUI;
    this.anchor = anchor;
    this.toggle(false);
  }

  public updateScore(score: number) {
    this.scoreUI.setText(`${score}m`);
    this.anchor.anchor();
  }

  public toggle(on: boolean) {
    this.scoreUI.setVisible(on);
  }
}
