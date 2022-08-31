export default class Will {
  public value: number;

  public highLimit: number;

  public highName: string;

  public lowLimit: number;

  public lowName: string;

  constructor(
    highName: string,
    highLimit: number,
    lowName: string,
    lowLimit: number,
    value: number,
  ) {
    this.value = value;
    this.highName = highName;
    this.highLimit = highLimit;
    this.lowLimit = lowLimit;
    this.lowName = lowName;
  }

  public getValue(): string | undefined {
    if (this.value > this.highLimit) return this.highName;

    if (this.value < this.lowLimit) return this.lowName;

    return undefined;
  }

  public getName() {
    return `${this.highName}_${this.lowName}`;
  }
}
