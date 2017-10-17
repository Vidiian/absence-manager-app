import { combineReducers } from 'redux';

import dateSelection from './dateSelection';
import users from './users';
import absences from './absences';

export default combineReducers({
  absences,
  dateSelection,
  users,
});
