import { handleActions } from 'redux-actions';

import dateHandling from '../logic/dateHandling';
import DataProvider from '../logic/DataProvider';
import dataReceiveActions from '../actions/data-receive-actions';
import absenceActions from '../actions/absence-actions';
import dataConstants from '../constants/dataConstants';
import AbsenceRecord from '../data/AbsenceRecord';

const initialState = {
  absenceRecords: new Map(),
};

const processAbsenceRecord = (record) => {
  const [userId, dateString, slot, type] = record;
  return new AbsenceRecord(userId, dateString, slot, type);
};

const storeAbsenceRecord = (state, record) => {
  const dateKey = dateHandling.getDateKey(record.date);
  const userId = record.userId;
  const dayEntry = state.absenceRecords.get(dateKey) || new Map();
  const userEntry = dayEntry.get(userId) || new Map();
  userEntry.set(record.slot, record);
  dayEntry.set(userId, userEntry);
  state.absenceRecords.set(dateKey, dayEntry);
};

const setAbsenceData = (state = initialState, action) => {
  state.absenceRecords.clear();
  const absenceData = action.payload || [];
  absenceData.forEach((recordData) => {
    const record = processAbsenceRecord(recordData);
    storeAbsenceRecord(state, record);
  });
  return { ...state };
};

const wipeAbsenceEntry = (state, dateKey, userId, slot) => {
  const dayEntry = state.absenceRecords.get(dateKey);
  if (!dayEntry) return;
  const userEntry = dayEntry.get(userId);
  if (!userEntry) return;
  userEntry.delete(slot);

  if (userEntry.size === 0) {
    dayEntry.delete(userId);
    if (dayEntry.size === 0) {
      state.absenceRecords.delete(dateKey);
    }
  }
};

const setAbsenceEntry = (state, dateKey, userId, slot, absenceType) => {
  const dayEntry = state.absenceRecords.get(dateKey) || new Map();
  if (dayEntry.size === 0) state.absenceRecords.set(dateKey, dayEntry);
  const userEntry = dayEntry.get(userId) || new Map();
  if (userEntry.size === 0) dayEntry.set(userId, userEntry);
  const slotEntry = userEntry.get(slot);
  if (slotEntry) {
    slotEntry.type = absenceType;
  } else {
    const newEntry = new AbsenceRecord(userId, dateKey, slot, absenceType);
    userEntry.set(slot, newEntry);
  }
};

const setAbsence = (state = initialState, action) => {
  const date = action.payload.date;
  const dateKey = dateHandling.getDateKey(date);
  const userId = action.payload.userId;
  const absenceType = action.payload.type;
  const slot = action.payload.slot;
  if (absenceType === dataConstants.PRESENT) {
    wipeAbsenceEntry(state, dateKey, userId, slot);
    DataProvider.DELETE('absences', { userId, date, slot });
  } else {
    setAbsenceEntry(state, dateKey, userId, slot, absenceType);
    DataProvider.POST('absences', { userId, date, slot, absenceType });
  }

  return { ...state };
};

const reducer = handleActions({
  [dataReceiveActions.receiveAbsenceData]: setAbsenceData,
  [absenceActions.setAbsence]: setAbsence,
}, initialState);

export default reducer;
