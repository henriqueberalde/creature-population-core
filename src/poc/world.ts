import Entity from '../models/entity';
import Event, { EventType } from '../models/event';

export default class World extends Entity {
  constructor(props: any) {
    const localProps = props;

    if (!localProps.events) localProps.events = [];
    if (!localProps.fields) localProps.fields = [];

    localProps.events.push(new Event(EventType.Entity, 'getOld', true));

    localProps.fields.push({
      key: 'age',
      value: '0'.toString(),
    });
    localProps.fields.push({
      key: 'sizeX',
      value: '1000'.toString(),
    });
    localProps.fields.push({
      key: 'sizeY',
      value: '1000'.toString(),
    });

    super(localProps);
  }
}
