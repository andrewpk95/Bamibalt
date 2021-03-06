import 'src/main.scss';
import 'src/assets/images/og_image.jpg';

import Phaser from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import WebFontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin';
import GameScene from 'src/scenes/game';
import BootScene from 'src/scenes/boot';
import LoadingScene from 'src/scenes/loading';
import TitleScene from 'src/scenes/title';
import ResultScene from 'src/scenes/result';
import IntroScene from 'src/scenes/intro';

function launchGame() {
  const config: Phaser.Types.Core.GameConfig = {
    width: 1920,
    height: 1080,
    scale: {
      mode: Phaser.Scale.ScaleModes.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 3000 },
      },
    },
    scene: [BootScene, LoadingScene, IntroScene, TitleScene, GameScene, ResultScene],
    title: 'BAMIBALT',
    url: 'https://github.com/andrewpk95/Bamibalt',
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
