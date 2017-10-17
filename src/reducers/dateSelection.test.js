import { startOfDay } from 'date-fns';

import dateSelection from './dateSelection';
import dateSelectActions from '../actions/date-select-actions';

describe('dateSelection', () => {
  it('should read in date when provided', () => {
    const testDate = startOfDay(new Date(1970, 0, 1));
    const action = dateSelectActions.selectDate(testDate);

    const state = dateSelection(undefined, action);

    expect(state.selectedDate).toEqual(testDate);
  });
});
