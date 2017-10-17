import { startOfDay } from 'date-fns';

import dataConstants from '../constants/dataConstants';

class AbsenceRecord {
  constructor(userId, dateString, slot, type) {
    this.userId = userId;
    this.date = startOfDay(new Date(dateString));
    switch (slot) {
      case 'AM':
        this.slot = dataConstants.AM_SLOT;
        break;
      case 'PM':
        this.slot = dataConstants.PM_SLOT;
        break;
      default:
        throw new Error(`Invalid Data Format: AM/PM Slot invalid - ${slot}`);
    }
    switch (type) {
      case 'P':
        this.type = dataConstants.PUBLIC_HOLIDAY;
        break;
      case 'V':
        this.type = dataConstants.VACATION;
        break;
      case 'T':
        this.type = dataConstants.TRAINING;
        break;
      default:
        throw new Error(`Invalid Data Format: Absence type invalid - ${type}`);
    }
  }
}

export default AbsenceRecord;
