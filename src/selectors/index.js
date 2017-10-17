import dateHandling from '../logic/dateHandling';

const getTitle = () => 'Absentee Manager';

const getSelectedDate = state => state.dateSelection.selectedDate;

const getActiveUserId = () => 1;
const getUserList = state => state.users;
const getUser = (state, userId) => state.users.users.get(userId);

const getAbsences = state => state.absences.absenceRecords;
const getAbsencesForDate = (state, date) => {
  const dateKey = dateHandling.getDateKey(date);
  return state.absences.absenceRecords.get(dateKey);
};

export default {
  getAbsences,
  getAbsencesForDate,
  getActiveUserId,
  getSelectedDate,
  getTitle,
  getUser,
  getUserList,
};
