export default interface Poolable {
  kill(): this;

  reset(x: number, y: number, config: unknown): this;
}
