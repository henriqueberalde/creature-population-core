import Event from './event';
import NotFoundEventError from './not_found_event_error';

export default class Entity {
  public readonly id: string = '';

  public readonly type: string = '';

  public readonly events: Event[] = [];

  public readonly fields: { key: string; value: string }[] = [];

  constructor(entity: any) {
    this.id = entity.id;
    this.type = entity.type;
    this.events = entity.events;
    this.fields = entity.fields;
  }

  public executeEvent(event: Event) {
    console.log(`EVENT ${event.name} from ${this.id} ${this.type}`);

    try {
      // eslint-disable-next-line no-eval
      eval(`this.${event.name}()`);
    } catch {
      throw new NotFoundEventError(event.name, this);
    }
  }

  public setField(key: string, value: string): void {
    const index = this.fields.findIndex((field) => field.key === key);

    if (index === -1) this.throwFieldNotFoundError(key);

    this.fields[index].value = value;
  }

  public getField(key: string): { key: string; value: string } | undefined {
    const entityFound = this.fields.find((field) => field.key === key);
    if (!entityFound) this.throwFieldNotFoundError(key);

    return entityFound;
  }

  private getOld() {
    console.log(` - GET_OLD INSIDE ${this.id} ${this.type}`);
    const fieldKJKey = 'age';
    const actualField = this.getField(fieldKJKey);

    if (actualField) {
      const newValue = +actualField.value + 1;
      this.setField(fieldKJKey, newValue.toString());
    }
  }

  private throwFieldNotFoundError(field: string) {
    throw new Error(
      `Field '${field}' not found on Entity\`s '${this.id}' fields list`,
    );
  }
}
