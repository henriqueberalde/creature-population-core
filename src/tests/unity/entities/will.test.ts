import Will from '../../../entities/will';

let will: Will;

describe('Will', () => {
  beforeEach(() => {
    will = new Will('highName', 100, 'lowName', -100, 0);
  });
  describe('constructor', () => {
    it('When called then values are set', () => {
      expect(will.highName).toBe('highName');
      expect(will.highLimit).toBe(100);
      expect(will.lowName).toBe('lowName');
      expect(will.lowLimit).toBe(-100);
      expect(will.value).toBe(0);
    });
  });
  describe('getValue', () => {
    it('When value is above highLimit then returns highName', () => {
      will.value = 101;
      expect(will.getValue()).toBe('highName');
    });
    it('When value is below lowLimit then returns lowName', () => {
      will.value = -101;
      expect(will.getValue()).toBe('lowName');
    });
    it('When value is in between the limits then returns undefined', () => {
      will.value = 0;
      expect(will.getValue()).toBe(undefined);
    });
  });
  describe('getName', () => {
    it('When called then return underscore betweeen both names', () => {
      expect(will.getName()).toBe('highName_lowName');
    });
  });
});
