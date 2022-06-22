import { UIKey } from 'src/types/ui';

export enum GameMode {
  Classic,
  Extreme,
  Estelle,
}

type ModeInfo = {
  text: UIKey
};
type ModeMap = Record<GameMode, ModeInfo>;

const MODE_MAP: ModeMap = {
  [GameMode.Classic]: {
    text: 'TitleScene_Mode_Classic',
  },
  [GameMode.Extreme]: {
    text: 'TitleScene_Mode_Extreme',
  },
  [GameMode.Estelle]: {
    text: 'TitleScene_Mode_Estelle',
  },
};

export function getModeText(mode: GameMode): UIKey {
  const modeInfo = MODE_MAP[mode];

  if (!modeInfo) {
    return 'TitleScene_Mode_Classic';
  }

  return modeInfo.text;
}
