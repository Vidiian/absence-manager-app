import { createAction } from 'redux-actions';
import { createActionThunk } from 'redux-thunk-actions';

import actions from '../constants/actionConstants';
import selectors from '../selectors';

const setAbsence = createAction(actions.SET_ABSENCE, (userId, date, slot, type) => ({
  userId, // number
  date, // Date object
  slot, // AM or PM
  type, // Present, Vacation, Public Holiday, Training
}));

const gatherAbsenceData = (slot, type, thunkWare) => {
  const userId = selectors.getActiveUserId();
  const date = selectors.getSelectedDate(thunkWare.getState());
  thunkWare.dispatch(setAbsence(userId, date, slot, type));
};

const requestAbsence = createActionThunk(actions.REQUEST_ABSENCE, gatherAbsenceData);

export default {
  requestAbsence,
  setAbsence,
};
