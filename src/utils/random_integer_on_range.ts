export default function getRandomIntegerOnRange(
  min: number,
  max: number,
): number {
  const random = Math.random();

  const result = Math.floor(random * (max + 1 - min) + min);

  return result;
}
