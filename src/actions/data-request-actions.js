import { createActionThunk } from 'redux-thunk-actions';

import receiveActions from './data-receive-actions';
import actions from '../constants/actionConstants';
import DataProvider from '../logic/DataProvider';

const requestUsers = thunkWare => (
  DataProvider.GET('users').then(userData => (
    thunkWare.dispatch(receiveActions.receiveUserData(userData))
  ))
);

const requestAbsences = thunkWare => (
  DataProvider.GET('absences').then(absenceData => (
    thunkWare.dispatch(receiveActions.receiveAbsenceData(absenceData))
  ))
);

const requestUserData = createActionThunk(
  actions.GET_USER_DATA,
  requestUsers,
);
const requestAbsenceData = createActionThunk(
  actions.GET_ABSENCE_DATA,
  requestAbsences,
);

export default {
  requestUserData,
  requestAbsenceData,
};
