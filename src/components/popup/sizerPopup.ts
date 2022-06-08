import Sizer from 'phaser3-rex-plugins/templates/ui/sizer/Sizer';
import BasePopup, { BasePopupOptions } from 'src/components/popup/basePopup';
import BaseScene from 'src/scenes/base';

export default abstract class SizerPopup<TOptions extends BasePopupOptions> extends BasePopup {
  private sizer: Sizer;

  constructor(scene: BaseScene) {
    super(scene, { closeOnTap: true });
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

    this.sizer.setVisible(true);
  }

  public close(): void {
    super.close();

    this.sizer.setVisible(false);
  }
}
