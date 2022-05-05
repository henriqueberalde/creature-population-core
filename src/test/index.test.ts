import hello from '../index';

describe('index', () => {
  it('First Test', () => {
    expect(hello('My world')).toBe('Hello My world!');
  });
});
