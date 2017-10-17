import { connect } from 'react-redux';

import AbsenceSelector from '../components/AbsenceSelector';
import dataConstants from '../constants/dataConstants';
import absenceActions from '../actions/absence-actions';
import selectors from '../selectors';

const emptyMap = new Map();

const mapStateToProps = (state, ownProps) => {
  const selectedDate = selectors.getSelectedDate(state);
  const absenceEntry = selectors.getAbsencesForDate(state, selectedDate) || emptyMap;
  const userEntry = absenceEntry.get(selectors.getActiveUserId()) || emptyMap;
  const slotEntry = userEntry.get(ownProps.slot);
  const props = {
    isPresent: true,
    isVacation: false,
    isPublicHoliday: false,
    isTraining: false,
  };
  if (slotEntry) {
    props.isPresent = false;
    switch (slotEntry.type) {
      case dataConstants.VACATION:
        props.isVacation = true;
        break;
      case dataConstants.PUBLIC_HOLIDAY:
        props.isPublicHoliday = true;
        break;
      case dataConstants.TRAINING:
        props.isTraining = true;
        break;
      default:
        throw new Error(`Invalid Data Format: Absence Type invalid - ${slotEntry.type}`);
    }
  }
  return props;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (type) => {
    dispatch(absenceActions.requestAbsence(ownProps.slot, type));
  },
});

const ComponentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AbsenceSelector);

export default ComponentContainer;
