import BaseScene from 'src/scenes/base';

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

  }
}
