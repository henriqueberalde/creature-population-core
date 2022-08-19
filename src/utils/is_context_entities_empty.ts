import { Context } from '../entities';

export default function isContextEntitiesEmpty(context: Context): boolean {
  return context.entities.length <= 0;
}
