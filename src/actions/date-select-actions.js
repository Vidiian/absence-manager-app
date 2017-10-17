import { createAction } from 'redux-actions';

import actions from '../constants/actionConstants';

const selectDate = createAction(actions.SELECT_DATE);

export default {
  selectDate,
};
