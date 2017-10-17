import React from 'react';
import PropTypes from 'prop-types';
import {
  BpkCalendarNav,
  BpkCalendarGridHeader,
  BpkCalendarGrid,
  composeCalendar,
  withCalendarState,
} from 'bpk-component-calendar';
import { cssModules } from 'bpk-react-utils';

import CustomCalendarDateContainer from '../containers/CustomCalendarDateContainer';

import STYLES from './custom-calendar.scss';

const getClassName = cssModules(STYLES);

const ComposedCalendar = withCalendarState(composeCalendar(
  BpkCalendarNav,
  BpkCalendarGridHeader,
  BpkCalendarGrid,
  CustomCalendarDateContainer,
));

const CustomCalendar = ({
  onDateSelect, formatMonth, formatDateFull, daysOfWeek, selectedDate, minDate, maxDate,
}) => (
  <ComposedCalendar
    className={getClassName('custom-calendar')}
    id="Calendar"
    onDateSelect={onDateSelect}
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={daysOfWeek}
    changeMonthLabel="Change month"
    minDate={minDate}
    maxDate={maxDate}
    date={selectedDate}
  />
);

CustomCalendar.propTypes = {
  onDateSelect: PropTypes.func.isRequired,
  formatMonth: PropTypes.func.isRequired,
  formatDateFull: PropTypes.func.isRequired,
  daysOfWeek: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    nameAbbr: PropTypes.string,
    index: PropTypes.number,
    isWeekend: PropTypes.bool,
  })).isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  minDate: PropTypes.objectOf(Date).isRequired,
  maxDate: PropTypes.objectOf(Date).isRequired,
};

export default CustomCalendar;
