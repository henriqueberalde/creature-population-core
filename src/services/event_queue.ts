import ModelEvent from '../models/event';

export default interface EventQueue {
  getAll(): Promise<ModelEvent[]>;
  create(entity: ModelEvent): Promise<string>;
}
