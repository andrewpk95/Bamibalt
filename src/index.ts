import 'src/main.scss';

import Phaser from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import WebFontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin';
import GameScene from 'src/scenes/game';
import BootScene from 'src/scenes/boot';
import LoadingScene from 'src/scenes/loading';
import TitleScene from 'src/scenes/title';
import ResultScene from 'src/scenes/result';

function launchGame() {
  const config = {
    width: 1920,
    height: 1080,
    scale: {
      mode: Phaser.Scale.ScaleModes.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
        gravity: { y: 2000 },
      },
    },
    scene: [BootScene, LoadingScene, TitleScene, GameScene, ResultScene],
    plugins: {
      global: [
        {
          key: 'rexWebFontLoader',
          plugin: WebFontLoaderPlugin,
          start: true,
        },
      ],
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
