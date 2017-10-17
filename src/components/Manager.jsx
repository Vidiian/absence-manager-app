import React from 'react';
import PropTypes from 'prop-types';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';
import { cssModules } from 'bpk-react-utils';

import CustomCalendarContainer from '../containers/CustomCalendarContainer';
import DayAbsenceControl from '../components/DayAbsenceControl';
import AbsenceDisplayContainer from '../containers/AbsenceDisplayContainer';

import STYLES from './absence-manager.scss';

const getClassName = cssModules(STYLES);

const Manager = ({
  title, minDate, maxDate,
}) => (
  <BpkGridContainer className={getClassName('absence-manager')}>
    <BpkGridRow className={getClassName('absence-manager__heading')}>
      <BpkGridColumn width={12}>
        <BpkText tagName="h1" textStyle="xl">{title}</BpkText>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow className={getClassName('absence-manager__body')}>
      <BpkGridColumn width={5} mobileWidth={12} className={getClassName('absence-manager__content-column')}>
        <CustomCalendarContainer
          id="calendar"
          changeMonthLabel="Change month"
          minDate={minDate}
          maxDate={maxDate}
        />
      </BpkGridColumn>
      <BpkGridColumn width={2} mobileWidth={0}>
        <span />
      </BpkGridColumn>
      <BpkGridColumn width={5} mobileWidth={12} className={getClassName('absence-manager__content-column')}>
        <DayAbsenceControl />
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={12}>
        <AbsenceDisplayContainer />
      </BpkGridColumn>
    </BpkGridRow>
  </BpkGridContainer>
);

Manager.propTypes = {
  title: PropTypes.string.isRequired,
  minDate: PropTypes.objectOf(Date).isRequired,
  maxDate: PropTypes.objectOf(Date).isRequired,
};

export default Manager;
