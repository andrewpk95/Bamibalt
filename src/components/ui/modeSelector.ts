import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import Sizer from 'phaser3-rex-plugins/templates/ui/sizer/Sizer';
import BaseScene from 'src/scenes/base';
import ArrowButton from 'src/components/buttons/arrowButton';
import { GameMode, getModeText } from 'src/types/mode';
import TextComponent from 'src/components/text';

export default class ModeSelector extends Sizer {
  protected rexUI: RexUIPlugin;

  private leftArrowButton: ArrowButton;
  private modeText: TextComponent;
  private rightArrowButton: ArrowButton;

  constructor(scene: BaseScene) {
    super(scene, {
      orientation: 'horizontal',
      space: {
        item: 20,
      },
    });

    this.rexUI = scene.rexUI;

    this.initializeComponents();
    this.scene.add.existing(this);
  }

  private initializeComponents() {
    const leftArrowButton = new ArrowButton(this.scene as BaseScene, {
      width: 70,
      height: 80,
      direction: 'left',
    });
    const currentModeUI = this.createCurrentModeUI();
    const rightArrowButton = new ArrowButton(this.scene as BaseScene, {
      width: 70,
      height: 80,
      direction: 'right',
    });

    leftArrowButton.on('released', this.handleLeftArrowPressed, this);
    rightArrowButton.on('released', this.handleRightArrowPressed, this);

    this.leftArrowButton = leftArrowButton;
    this.rightArrowButton = rightArrowButton;

    this
      .add(leftArrowButton)
      .add(currentModeUI)
      .add(rightArrowButton)
      .layout();
  }

  private createCurrentModeUI() {
    const background = this.rexUI.add.roundRectangle(0, 0, 280, 90, 30, 0xffffff)
      .setStrokeStyle(7, 0xbd2018);
    const text = new TextComponent(this.scene, {
      key: getModeText(this.scene.registry.get('mode')),
      style: {
        fontSize: '40px',
        color: '#660000',
        align: 'center',
      },
    });
    const sizer = this.rexUI.add.overlapSizer()
      .add(background, {
        expand: false,
      })
      .add(text, {
        expand: false,
      });

    this.modeText = text;
    this.scene.registry.events.on('changedata', this.handleChangeData, this);

    return sizer;
  }

  private handleLeftArrowPressed() {
    const numModes = Object.keys(GameMode).length / 2;
    const currentMode: number = this.scene.registry.get('mode');
    const nextMode = (numModes + currentMode - 1) % numModes;

    this.scene.registry.set('mode', nextMode);
  }

  private handleRightArrowPressed() {
    const numModes = Object.keys(GameMode).length / 2;
    const currentMode: number = this.scene.registry.get('mode');
    const nextMode = (numModes + currentMode + 1) % numModes;

    this.scene.registry.set('mode', nextMode);
  }

  private handleChangeData(_, key: string, value: GameMode) {
    if (key === 'mode') {
      this.modeText.setKey(getModeText(value));
      this.layout();
    }
  }

  destroy(fromScene?: boolean): void {
    this.leftArrowButton.off('pressed', this.handleLeftArrowPressed);
    this.rightArrowButton.off('pressed', this.handleRightArrowPressed);
    this.scene.registry.events.off('changedata', this.handleChangeData);

    super.destroy(fromScene);
  }
}
