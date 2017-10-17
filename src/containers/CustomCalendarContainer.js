import { connect } from 'react-redux';
import format from 'date-fns/format';

import CustomCalendar from '../components/CustomCalendar';
import dateSelectActions from '../actions/date-select-actions';
import selectors from '../selectors';
import daysOfWeekFormatting from '../data/daysOfWeekFormatting';

const formatDateFull = date => format(date, 'dddd, Do MMMM YYYY');
const formatMonth = date => format(date, 'MMMM YYYY');

const mapStateToProps = state => ({
  formatDateFull,
  formatMonth,
  daysOfWeek: daysOfWeekFormatting.getDaysOfWeek(),
  selectedDate: selectors.getSelectedDate(state),
});

const mapDispatchToProps = dispatch => ({
  onDateSelect: date => dispatch(dateSelectActions.selectDate(date)),
});

const CustomCalendarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomCalendar);

export default CustomCalendarContainer;
