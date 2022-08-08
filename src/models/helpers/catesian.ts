export const maxCartesianValue = 1000;

export default function limitCartesianValue(
  value: number,
  sumValue: number,
  limit: number,
) {
  let result = value + sumValue;

  if (result > limit) result = limit;
  else if (result < 0) result = 0;

  return result;
}
