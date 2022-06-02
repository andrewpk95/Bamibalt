import 'src/main.scss';

import Phaser from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import GameScene from 'src/scenes/game';
import BootScene from 'src/scenes/boot';
import LoadingScene from 'src/scenes/loading';
import TitleScene from 'src/scenes/title';
import ResultScene from 'src/scenes/result';

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
    scene: [BootScene, LoadingScene, TitleScene, GameScene, ResultScene],
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
