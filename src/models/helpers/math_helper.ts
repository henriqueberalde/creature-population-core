export default class MathHelper {
  public static proportion(
    n: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number,
    withinBounds = false,
  ): number {
    const newval =
      ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;

    if (!withinBounds) return newval;

    if (start2 < stop2) return MathHelper.constrain(newval, start2, stop2);

    return MathHelper.constrain(newval, stop2, start2);
  }

  public static constrain(n: number, low: number, high: number): number {
    return Math.max(Math.min(n, high), low);
  }
}
