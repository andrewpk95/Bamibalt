import TextComponent from 'src/components/text';

export default class TitleText extends TextComponent {
  constructor(scene: Phaser.Scene) {
    super(scene, {
      key: 'TitleScene_Title',
      style: {
        color: '#ffffff',
        fontSize: '180px',
        stroke: '#bd2018',
        strokeThickness: 20,
        shadow: {
          stroke: true,
          color: '#000000aa',
          blur: 10,
          offsetY: 10,
        },
        padding: {
          left: 10,
          right: 10,
          bottom: 10,
        },
      },
    });

    const gradient = this.context.createLinearGradient(0, this.height, 0, 0);

    gradient.addColorStop(0, '#aaaaaa');
    gradient.addColorStop(0.25, '#ffffff');
    gradient.addColorStop(0.5, '#ffffff');
    gradient.addColorStop(0.75, '#ffffff');
    gradient.addColorStop(1, '#aaaaaa');

    this.setFill(gradient);
    this.setOrigin(0.5, 0.5);
  }
}
