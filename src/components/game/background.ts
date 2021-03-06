import Phaser from 'phaser';
import { Texture } from 'src/types/image';

type BackgroundInfo = {
  scrollX: number;
  scrollY: number;
  texture: Texture;
  frame?: string;
};

type BackgroundItem = BackgroundInfo & {
  tileSprite: Phaser.GameObjects.TileSprite;
};

const BACKGROUND_LIST: BackgroundInfo[] = [
  {
    scrollX: 0.1,
    scrollY: 0.1,
    texture: Texture.Sky,
  },
  {
    scrollX: 0.25,
    scrollY: 0.25,
    texture: Texture.BGBuildingBack,
  },
  {
    scrollX: 0.5,
    scrollY: 0.5,
    texture: Texture.BGBuildingFront,
  },
];

export default class Background extends Phaser.GameObjects.Container {
  private backgrounds: BackgroundItem[] = [];

  constructor(scene: Phaser.Scene) {
    super(scene);

    this.initializeComponents();
    this.scene.add.existing(this);
    this.scene.events.on('update', this.update, this);
  }

  private initializeComponents() {
    BACKGROUND_LIST.forEach((background) => {
      const { scrollY, texture, frame } = background;
      const tileSprite = this.createTileSprite(scrollY, texture, frame);

      this.add(tileSprite);
      this.backgrounds.push({ ...background, tileSprite });
    });
  }

  private createTileSprite(scrollY: number, texture: Texture, frame?: string) {
    const { width, height } = this.scene.scale;
    const { height: tileHeight } = this.scene.textures.getFrame(texture, frame);
    const tileSprite = this.scene.add.tileSprite(0, height, width, tileHeight, texture, frame);

    tileSprite
      .setOrigin(0, 1)
      .setScrollFactor(0, scrollY);

    return tileSprite;
  }

  update(): void {
    for (let i = 0; i < this.backgrounds.length; i++) {
      const { scrollX, tileSprite } = this.backgrounds[i];

      tileSprite.tilePositionX = this.scene.cameras.main.scrollX * scrollX;
    }
  }

  destroy(fromScene?: boolean): void {
    if (!this.scene) {
      return;
    }
    this.scene.events.off('update', this.update);

    super.destroy(fromScene);
  }
}
