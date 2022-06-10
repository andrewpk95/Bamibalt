import Sizer from 'phaser3-rex-plugins/templates/ui/sizer/Sizer';
import BasePopup, { BasePopupOptions } from 'src/components/popup/basePopup';
import BaseScene from 'src/scenes/base';

type SizerPopupOptions = {
  transition: boolean;
};

export default abstract class SizerPopup<TOptions extends BasePopupOptions> extends BasePopup {
  private transition: boolean;
  private sizer: Sizer;

  constructor(scene: BaseScene, { transition }: SizerPopupOptions) {
    super(scene, { closeOnTap: true });

    this.transition = transition;
  }

  protected initializeComponents(options: TOptions): void {
    super.initializeComponents(options);

    const sizer = this.createContent(options)
      .setVisible(false)
      .layout();

    this.sizer = sizer;
    this.add(sizer);
  }

  protected abstract createContent(options?: TOptions): Sizer;

  public open(): void {
    super.open();

    this.sizer
      .setVisible(true)
      .layout();
    if (this.transition) {
      this.sizer.popUp(200);
    }
  }

  public close(): void {
    super.close();

    this.sizer.setVisible(false);
  }
}
