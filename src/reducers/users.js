import { handleActions } from 'redux-actions';

import dataReceiveActions from '../actions/data-receive-actions';

const initialState = {
  users: new Map(),
};

const setUserData = (state = initialState, action) => {
  const props = {
    users: new Map(action.payload),
  };
  return { ...state, ...props };
};

const reducer = handleActions({
  [dataReceiveActions.receiveUserData]: setUserData,
}, initialState);

export default reducer;
