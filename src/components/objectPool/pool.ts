import Poolable from 'src/components/objectPool/poolable';

type PoolOptions = {
  initCount?: number,
  defaultArgs: any[],
};

export default class Pool<T extends Poolable> {
  private pool: T[] = [];
  private create: () => T;

  constructor(T: new (...args: any[]) => T, {
    initCount = 0,
    defaultArgs,
  }: PoolOptions) {
    this.create = () => new T(...defaultArgs).kill();

    for (let i = 0; i < initCount; i++) {
      const object = this.create();

      this.pool.push(object);
    }
  }

  public get(x: number, y: number, config?: any) {
    const object = this.pool.length ? this.pool.pop() : this.create();

    object.reset(x, y, config);
    return object;
  }

  public return(object: T) {
    object.kill();
    this.pool.push(object);
  }
}
