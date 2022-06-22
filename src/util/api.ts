import { GameMode } from 'src/types/mode';

// 백엔드를 할 줄 알면 LocalStorage 대신에 DB를 써서 저장할텐데 흐규

type HighScoreMap = {
  [GameMode.Classic]: number;
  [GameMode.Extreme]: number;
  [GameMode.Estelle]: number;
};

const LOCAL_STORAGE_KEY = 'BAMIBALT';
const DEFAULT_HIGH_SCORE_MAP: HighScoreMap = {
  [GameMode.Classic]: 0,
  [GameMode.Extreme]: 0,
  [GameMode.Estelle]: 0,
};

class APISingleton {
  private getHighScoreMap() {
    const rawSaveData = window.localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!rawSaveData) {
      return 0;
    }

    const highScoreMap: HighScoreMap = JSON.parse(rawSaveData);

    return { ...DEFAULT_HIGH_SCORE_MAP, ...highScoreMap };
  }

  public getHighScore(mode: GameMode) {
    const rawSaveData = window.localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!rawSaveData) {
      return 0;
    }

    const highScoreMap: HighScoreMap = JSON.parse(rawSaveData);
    const highScore = highScoreMap[mode] ?? 0;

    return highScore;
  }

  public setHighScore(score: number, mode: GameMode) {
    const highScoreMap = this.getHighScoreMap();
    const highScore = highScoreMap[mode];

    if (score > highScore) {
      highScoreMap[mode] = score;
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(highScoreMap));
    }
  }
}

const API = new APISingleton();

export default API;
