import Event from '../../models/event';

describe('event', () => {
  describe('.create', () => {
    it('when fields passed enqueues the event', async () => {
      const indexFieldName = 1;
      const indexFieldClass = 3;
      const indexFieldMethod = 5;

      const event = new Event('name1', 'class1', 'method1');
      const eventId = await event.create();

      const events = await Event.get(eventId ?? '');
      const [id, fields] = events[0];

      expect(id).not.toBeNull();
      expect(fields[indexFieldName]).toBe('name1');
      expect(fields[indexFieldClass]).toBe('class1');
      expect(fields[indexFieldMethod]).toBe('method1');
    });
  });
});
