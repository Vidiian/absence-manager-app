import { connect } from 'react-redux';

import CustomCalendarDate from '../components/CustomCalendarDate';
import dateHandling from '../logic/dateHandling';
import selectors from '../selectors';

const emptyMap = new Map();

const mapStateToProps = (state, ownProps) => {
  const absenceEntries = selectors.getAbsencesForDate(state, ownProps.date) || emptyMap;
  const userAbsent = absenceEntries.has(selectors.getActiveUserId());
  const clashAbsence = userAbsent && dateHandling.isClashingDate(
    selectors.getAbsences(state),
    ownProps.date,
    selectors.getActiveUserId(),
  );
  const selfAbsence = !clashAbsence && userAbsent;
  const otherAbsence = absenceEntries.size && !userAbsent;
  const props = {
    modifiers: {
      'absence-clash': () => clashAbsence,
      'absence-self': () => selfAbsence,
      'absence-other': () => otherAbsence,
    },
  };
  return props;
};

const mapDispatchToProps = () => ({});

const CalendarDateContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomCalendarDate);

export default CalendarDateContainer;
