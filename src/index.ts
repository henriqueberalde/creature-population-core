const cWorld = 'world';

export function hello(world: string = cWorld): string {
  return `Hello ${world}! `;
}
