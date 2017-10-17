import { createAction } from 'redux-actions';

import actions from '../constants/actionConstants';

const receiveAbsenceData = createAction(actions.RECEIVE_ABSENCE_DATA);
const receiveUserData = createAction(actions.RECEIVE_USER_DATA);

export default {
  receiveAbsenceData,
  receiveUserData,
};
