export default function pauseTime(milliseconds: number): void {
  const dt = new Date();
  // eslint-disable-next-line no-loops/no-loops
  while ((new Date() as any) - (dt as any) <= milliseconds) {
    /* Do nothing */
  }
}
