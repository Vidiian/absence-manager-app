import { startOfDay } from 'date-fns';

import absences from './absences';
import absenceActions from '../actions/absence-actions';
import dataReceiveActions from '../actions/data-receive-actions';
import dataConstants from '../constants/dataConstants';

describe('absences', () => {
  it('should return empty Map when no data is provided', () => {
    const action = dataReceiveActions.receiveAbsenceData([]);

    const state = absences(undefined, action);

    expect(state.absenceRecords.size).toEqual(0);
  });

  it('should read in absence data when provided', () => {
    const testAbsences = [
      [1, 'Thu 1970-01-01', dataConstants.AM_SLOT, dataConstants.VACATION],
      [1, 'Thu 1970-01-01', dataConstants.PM_SLOT, dataConstants.VACATION],
      [1, 'Mon 2001-01-01', dataConstants.AM_SLOT, dataConstants.PUBLIC_HOLIDAY],
      [2, 'Mon 2001-01-01', dataConstants.AM_SLOT, dataConstants.PUBLIC_HOLIDAY],
      [3, 'Mon 2001-01-01', dataConstants.AM_SLOT, dataConstants.PUBLIC_HOLIDAY],
    ];
    const action = dataReceiveActions.receiveAbsenceData(testAbsences);

    const state = absences(undefined, action);

    expect(state.absenceRecords.size).toEqual(2);
    expect(state.absenceRecords.get('1970/01/01').size).toEqual(1);
    expect(state.absenceRecords.get('1970/01/01').get(1).size).toEqual(2);
    expect(state.absenceRecords.get('1970/01/01').get(1).get(dataConstants.AM_SLOT).type).toEqual(dataConstants.VACATION);
    expect(state.absenceRecords.get('2001/01/01').size).toEqual(3);
  });

  it('should set new absence where none exists', () => {
    const initialState = { absenceRecords: new Map() };
    const action = absenceActions.setAbsence(
      1, startOfDay(new Date(1970, 0, 1)), dataConstants.AM_SLOT, dataConstants.TRAINING,
    );

    const state = absences(initialState, action);

    expect(state.absenceRecords.get('1970/01/01').get(1).get(dataConstants.AM_SLOT).type).toEqual(dataConstants.TRAINING);
  });

  it('should set new absence alongside existing absence for same user where slot permits', () => {
    const initialState = { absenceRecords: new Map() };
    const testAbsences = [
      [1, 'Thu 1970-01-01', dataConstants.AM_SLOT, dataConstants.VACATION],
    ];
    const loadAction = dataReceiveActions.receiveAbsenceData(testAbsences);
    const preLoadedState = absences(initialState, loadAction);
    expect(preLoadedState.absenceRecords.get('1970/01/01').get(1).size).toEqual(1);

    const action = absenceActions.setAbsence(
      1, startOfDay(new Date(1970, 0, 1)), dataConstants.PM_SLOT, dataConstants.TRAINING,
    );

    const state = absences(preLoadedState, action);

    expect(state.absenceRecords.get('1970/01/01').get(1).size).toEqual(2);
  });

  it('should set new absence alongside existing absence for different user', () => {
    const initialState = { absenceRecords: new Map() };
    const testAbsences = [
      [2, 'Thu 1970-01-01', dataConstants.AM_SLOT, dataConstants.VACATION],
    ];
    const loadAction = dataReceiveActions.receiveAbsenceData(testAbsences);
    const preLoadedState = absences(initialState, loadAction);
    expect(preLoadedState.absenceRecords.get('1970/01/01').get(1)).toEqual(undefined);
    expect(preLoadedState.absenceRecords.get('1970/01/01').get(2).size).toEqual(1);

    const action = absenceActions.setAbsence(
      1, startOfDay(new Date(1970, 0, 1)), dataConstants.PM_SLOT, dataConstants.TRAINING,
    );

    const state = absences(preLoadedState, action);

    expect(state.absenceRecords.get('1970/01/01').get(1).size).toEqual(1);
    expect(state.absenceRecords.get('1970/01/01').get(2).size).toEqual(1);
  });

  it('should remove existing absence for user when they are marked present for that period', () => {
    const initialState = { absenceRecords: new Map() };
    const testAbsences = [
      [1, 'Thu 1970-01-01', dataConstants.AM_SLOT, dataConstants.VACATION],
    ];
    const loadAction = dataReceiveActions.receiveAbsenceData(testAbsences);
    const preLoadedState = absences(initialState, loadAction);
    expect(preLoadedState.absenceRecords.get('1970/01/01').get(1).size).toEqual(1);

    const action = absenceActions.setAbsence(
      1, startOfDay(new Date(1970, 0, 1)), dataConstants.AM_SLOT, dataConstants.PRESENT,
    );

    const state = absences(preLoadedState, action);

    expect(state.absenceRecords.get('1970/01/01')).toEqual(undefined);
  });

  it('should remove only specified user record when user is present for a give period', () => {
    const initialState = { absenceRecords: new Map() };
    const testAbsences = [
      [1, 'Thu 1970-01-01', dataConstants.AM_SLOT, dataConstants.VACATION],
      [2, 'Thu 1970-01-01', dataConstants.AM_SLOT, dataConstants.VACATION],
    ];
    const loadAction = dataReceiveActions.receiveAbsenceData(testAbsences);
    const preLoadedState = absences(initialState, loadAction);
    expect(preLoadedState.absenceRecords.get('1970/01/01').size).toEqual(2);

    const action = absenceActions.setAbsence(
      1, startOfDay(new Date(1970, 0, 1)), dataConstants.AM_SLOT, dataConstants.PRESENT,
    );

    const state = absences(preLoadedState, action);

    expect(preLoadedState.absenceRecords.get('1970/01/01').size).toEqual(1);
  });
});
