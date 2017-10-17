import users from './users';
import dataReceiveActions from '../actions/data-receive-actions';

describe('users', () => {
  it('should return empty Map when no data is provided', () => {
    const action = dataReceiveActions.receiveUserData();

    const state = users(undefined, action);

    expect(state.users.size).toEqual(0);
  });

  it('should read in user data when provided', () => {
    const testUsers = [[1, 'Adam'], [2, 'Steve'], [3, 'Lilith']];
    const action = dataReceiveActions.receiveUserData(testUsers);

    const state = users(undefined, action);

    expect(state.users.size).toEqual(3);
    expect(state.users.get(2)).toEqual('Steve');
  });
});
