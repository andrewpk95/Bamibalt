import RetryButton from 'src/components/buttons/retryButton';
import ToTitleButton from 'src/components/buttons/toTitleButton';
import TextComponent from 'src/components/text';
import BaseScene from 'src/scenes/base';
import API from 'src/util/api';

export default class ResultScene extends BaseScene {
  private result: any;

  constructor() {
    super({
      key: 'ResultScene',
    });
  }

  init(data?: any) {
    if (!data) {
      throw new Error('No result data provided');
    }
    this.result = data;
  }

  create() {
    const score = this.result.record;
    const text = new TextComponent(this, {
      x: 500,
      y: 500,
      string: `결과: ${this.result.record}m`,
      style: {
        fontSize: '100px',
      },
    });

    const retryButton = new RetryButton(this);
    const toTitleButton = new ToTitleButton(this);

    API.setHighScore(score);
    this.rexUI.add.sizer({
      orientation: 'horizontal',
      anchor: {
        x: '70%',
        y: '70%',
      },
      space: {
        item: 20,
      },
    })
      .add(retryButton)
      .add(toTitleButton)
      .layout();
  }
}
