import { startOfDay } from 'date-fns';

import dateHandling from './dateHandling';

describe('dateHandling', () => {
  describe('getDateKey', () => {
    it('should return date formatted as expected', () => {
      expect(dateHandling.getDateKey(startOfDay(new Date(1970, 0, 1)))).toEqual('1970/01/01');
    });
  });

  describe('isClashingDate', () => {
    const absencesMock = new Map();
    absencesMock.set('1970/01/01', new Map([[2, 'mockAbsence']]));

    it('should identify matching dates as clashing', () => {
      expect(
        dateHandling.isClashingDate(absencesMock, startOfDay(new Date(1970, 0, 1)), 1),
      ).toBe(true);
    });

    it('should identify adjacent dates as clashing', () => {
      expect(
        dateHandling.isClashingDate(absencesMock, startOfDay(new Date(1970, 0, 2)), 1),
      ).toBe(true);
    });

    it('should identify dates within four days as clashing, not counting weekends', () => {
      expect(
        dateHandling.isClashingDate(absencesMock, startOfDay(new Date(1970, 0, 7)), 1),
      ).toBe(true);
    });

    it('should identify dates beyond four days as not clashing, not counting weekends', () => {
      expect(
        dateHandling.isClashingDate(absencesMock, startOfDay(new Date(1970, 0, 8)), 1),
      ).toBe(false);
    });

    it('should identify dates of own absences as not clashing', () => {
      expect(
        dateHandling.isClashingDate(absencesMock, startOfDay(new Date(1970, 0, 2)), 2),
      ).toBe(false);
    });
  });
});
