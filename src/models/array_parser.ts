export default class ArrayParser {
  public static arrayToAny(fields: string[]): any {
    const keys: string[] = [];
    const values: string[] = [];

    fields.forEach((field, index) => {
      if (index % 2 === 0) keys.push(field);
      else values.push(field);
    });

    const result: any = {};

    keys.forEach((key: string, index: number) => {
      result[key] = values[index];
    });

    return result;
  }
}
