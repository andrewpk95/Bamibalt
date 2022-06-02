import 'src/main.scss';

import Phaser from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import GameScene from 'src/scenes/game';

function launchGame() {
  const { innerWidth: width, innerHeight: height } = window;
  const config = {
    width,
    height,
    scale: {
      mode: Phaser.Scale.ScaleModes.FIT,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 900 },
      },
    },
    scene: [GameScene],
    plugins: {
      scene: [
        {
          key: 'rexUI',
          plugin: RexUIPlugin,
          mapping: 'rexUI',
        },
      ],
    },
  };

  return new Phaser.Game(config);
}

window.addEventListener('load', () => {
  launchGame();
});
