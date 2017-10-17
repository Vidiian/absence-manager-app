import { format, addDays, subDays, isWeekend } from 'date-fns';

import dataConstants from '../constants/dataConstants';

const getDateKey = date => format(date, 'YYYY/MM/DD');

const isClashingDate = (absences, date, userId) => {
  let checkDate = new Date(date);
  let backCount = 0;
  while (backCount < dataConstants.CONFLICT_DAY_RANGE) {
    checkDate = subDays(checkDate, 1);
    if (!isWeekend(checkDate)) backCount += 1;
  }
  const dateKeys = [];
  let totalCount = 0;
  while (totalCount <= (dataConstants.CONFLICT_DAY_RANGE) * 2) {
    if (!isWeekend(checkDate)) {
      dateKeys.push(getDateKey(checkDate));
      totalCount += 1;
    }
    checkDate = addDays(checkDate, 1);
  }
  return dateKeys.some((dateKey) => {
    const absenceEntry = absences.get(dateKey);
    if (!absenceEntry) return false;
    const othersAbsent = absenceEntry.size > 1 || !absenceEntry.get(userId);
    return othersAbsent;
  });
};

export default {
  getDateKey,
  isClashingDate,
};
