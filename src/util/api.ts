const LOCAL_STORAGE_KEY = 'BAMIBALT';

class APISingleton {
  public getHighScore() {
    const rawSaveData = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    const highScore = rawSaveData ? parseInt(rawSaveData, 10) : 0;

    return highScore;
  }

  public setHighScore(score: number) {
    const highScore = this.getHighScore();

    if (score > highScore) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, score.toString());
    }
  }
}

const API = new APISingleton();

export default API;
