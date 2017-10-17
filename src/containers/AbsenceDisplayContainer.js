import { connect } from 'react-redux';

import AbsenceDisplay from '../components/AbsenceDisplay';
import dateHandling from '../logic/dateHandling';
import selectors from '../selectors';

const mapStateToProps = (state) => {
  const activeUserId = selectors.getActiveUserId();
  const selectedDate = selectors.getSelectedDate(state);
  const dateKey = dateHandling.getDateKey(selectedDate);
  const absenceList = selectors.getAbsencesForDate(state, selectedDate);
  if (!absenceList) return {};
  const absences = [];
  absenceList.forEach((slots, userId) => {
    if (activeUserId !== userId) {
      const userName = selectors.getUser(state, userId);
      slots.forEach((record, slot) => {
        const key = `${dateKey}|${userId}|${slot}`;
        const type = record.type;
        const absence = { key, userName, slot, type };
        absences.push(absence);
      });
    }
  });
  return { absences };
};

const mapDispatchToProps = () => {};

const AbsenceDisplayContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AbsenceDisplay);

export default AbsenceDisplayContainer;
