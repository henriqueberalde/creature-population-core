const cWorld = 'world';

export default function hello(world: string = cWorld): string {
  return `Hello ${world}!`;
}
