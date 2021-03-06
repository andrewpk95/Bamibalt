import TitleScreenImage from 'src/assets/images/title_screen.png';
import GameOverScreenImage from 'src/assets/images/gameover_screen.png';

import BamikoSpriteSheet from 'src/assets/images/bamiko.png';
import BamikoSpriteAtlas from 'src/assets/images/bamiko.json';
import YuriSpriteSheet from 'src/assets/images/yuri.png';
import YuriSpriteAtlas from 'src/assets/images/yuri.json';
import EstelleSpriteSheet from 'src/assets/images/estelle.png';
import EstelleSpriteAtlas from 'src/assets/images/estelle.json';
import ObjectSpriteSheet from 'src/assets/images/object.png';
import ObjectSpriteAtlas from 'src/assets/images/object.json';
import GroundImage from 'src/assets/images/ground.png';
import BuildingTopImage from 'src/assets/images/building_top.png';
import BuildingInsideImage from 'src/assets/images/building_inside.png';
import BuildingBottomImage from 'src/assets/images/building_bottom.png';
import SkyImage from 'src/assets/images/sky.png';
import BGBuildingFrontImage from 'src/assets/images/bg_building_front.png';
import BGBuildingBackImage from 'src/assets/images/bg_building_back.png';

import TitleMusic from 'src/assets/sounds/Title_Theme.mp3';
import BamibaltMusic from 'src/assets/sounds/Bamibalt_Theme.mp3';
import YuriMusic from 'src/assets/sounds/Yuri_Mini_Theme.mp3';
import EstelleMusic from 'src/assets/sounds/Estelle_Mini_Theme.mp3';
import GameOverMusic from 'src/assets/sounds/GameOver_Theme.mp3';
import HitSound from 'src/assets/sounds/hit.mp3';
import JumpSound from 'src/assets/sounds/jump.mp3';
import LandSound from 'src/assets/sounds/land.mp3';
import SplatSound from 'src/assets/sounds/splat.mp3';
import WindowBreakSound from 'src/assets/sounds/window_break.mp3';
import PlaneSound from 'src/assets/sounds/plane.mp3';
import FallSound from 'src/assets/sounds/fall.mp3';
import WarningSound from 'src/assets/sounds/warning.mp3';
import ButtonClickSound from 'src/assets/sounds/click.mp3';
import SelectSound from 'src/assets/sounds/select.mp3';
import RunAwaySound from 'src/assets/sounds/runaway.mp3';

import PlayButton from 'src/components/buttons/playButton';
import BaseScene from 'src/scenes/base';
import GameUIScene from 'src/scenes/gameUI';
import PopupScene from 'src/scenes/popup';
import { Texture } from 'src/types/image';
import { Music, SFX } from 'src/types/sound';
import TextComponent from 'src/components/text';
import ReloadButton from 'src/components/buttons/ReloadButton';

export default class LoadingScene extends BaseScene {
  private loadingText: TextComponent;
  private isLoadingFailed: boolean = false;

  constructor() {
    super({
      key: 'LoadingScene',
    });
  }

  preload() {
    const loadingText = new TextComponent(this, {
      key: 'LoadingScene_Loading',
      parameters: { 0: 0 },
      style: {
        fontSize: '50px',
        color: '#ffffff',
      },
    }).setOrigin(0.5, 0.5);
    const anchor = this.rexUI.add.anchor(loadingText, {
      x: 'center',
      y: '100%-200',
    });

    this.loadingText = loadingText;
    this.loadAssets();

    this.load.on('progress', (value: number) => {
      loadingText.setParameters({ 0: Math.round(value * 100) });
      anchor.anchor();
    });
    this.load.once('loaderror', () => {
      this.isLoadingFailed = true;
    });
  }

  private loadAssets() {
    this.load.image(Texture.TitleScreen, TitleScreenImage);
    this.load.image(Texture.GameOverScreen, GameOverScreenImage);
    this.load.atlas(Texture.Bamiko, BamikoSpriteSheet, BamikoSpriteAtlas);
    this.load.atlas(Texture.Yuri, YuriSpriteSheet, YuriSpriteAtlas);
    this.load.atlas(Texture.Estelle, EstelleSpriteSheet, EstelleSpriteAtlas);
    this.load.atlas(Texture.Object, ObjectSpriteSheet, ObjectSpriteAtlas);
    this.load.image(Texture.Ground, GroundImage);
    this.load.image(Texture.BuildingTop, BuildingTopImage);
    this.load.image(Texture.BuildingInside, BuildingInsideImage);
    this.load.image(Texture.BuildingBottom, BuildingBottomImage);
    this.load.image(Texture.Sky, SkyImage);
    this.load.image(Texture.BGBuildingFront, BGBuildingFrontImage);
    this.load.image(Texture.BGBuildingBack, BGBuildingBackImage);

    this.load.audio(Music.Title, TitleMusic);
    this.load.audio(Music.Bamibalt, BamibaltMusic);
    this.load.audio(Music.Yuri, YuriMusic);
    this.load.audio(Music.Estelle, EstelleMusic);
    this.load.audio(Music.GameOver, GameOverMusic);
    this.load.audio(SFX.Collision, HitSound);
    this.load.audio(SFX.Jump, JumpSound);
    this.load.audio(SFX.Land, LandSound);
    this.load.audio(SFX.Splat, SplatSound);
    this.load.audio(SFX.WindowCrash, WindowBreakSound);
    this.load.audio(SFX.Plane, PlaneSound);
    this.load.audio(SFX.Fall, FallSound);
    this.load.audio(SFX.Warning, WarningSound);
    this.load.audio(SFX.ButtonClick, ButtonClickSound);
    this.load.audio(SFX.Select, SelectSound);
    this.load.audio(SFX.RunAway, RunAwaySound);
  }

  create() {
    this.load.removeAllListeners();

    if (this.isLoadingFailed) {
      this.displayErrorPage();
      return;
    }

    const playButton = new PlayButton(this);

    this.rexUI.add.anchor(playButton, {
      x: 'center',
      y: '100%-100',
    });

    this.loadingText.setKey('LoadingScene_Ready');

    this.scene.add('GameUIScene', GameUIScene, true);
    this.scene.add('PopupScene', PopupScene, true);
  }

  private displayErrorPage() {
    const reloadButton = new ReloadButton(this);

    this.rexUI.add.anchor(reloadButton, {
      x: 'center',
      y: '100%-100',
    });
    this.loadingText.setKey('LoadingScene_Load_Error');
  }
}
