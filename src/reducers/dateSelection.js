import { handleActions } from 'redux-actions';
import { startOfDay } from 'date-fns';

import dateActions from '../actions/date-select-actions';

const initialState = {
  selectedDate: startOfDay(new Date()),
};

const setSelectedDate = (state = initialState, action) => {
  const props = {
    selectedDate: action.payload,
  };
  return { ...state, ...props };
};

const reducer = handleActions({
  [dateActions.selectDate]: setSelectedDate,
}, initialState);

export default reducer;
