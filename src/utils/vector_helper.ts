import { Vector } from 'ts-matrix';

export default class VectorHelper {
  public static mult(v: Vector, n: number): Vector {
    const matrix: number[] = new Array(v.values.length).fill(n);
    const result = v.multiply(new Vector(matrix));

    return result;
  }

  public static div(v: Vector, n: number): Vector {
    const matrix: number[] = new Array(v.values.length).fill(n);
    const result = v.divide(new Vector(matrix));

    return result;
  }

  public static setMag(v: Vector, n: number): Vector {
    const vNormalized = v.normalize();
    return VectorHelper.mult(vNormalized, n);
  }

  public static limit(v: Vector, max: number): Vector {
    const mSq = v.squaredLength();

    if (mSq > max * max) {
      // eslint-disable-next-line no-param-reassign
      v = VectorHelper.mult(VectorHelper.div(v, Math.sqrt(mSq)), max);
    }
    return v;
  }
}
