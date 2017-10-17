import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';
import BpkText from 'bpk-component-text';

import AbsenceSelectorContainer from '../containers/AbsenceSelectorContainer';
import dataConstants from '../constants/dataConstants';

import STYLES from './absence-control.scss';

const getClassName = cssModules(STYLES);

const DayAbsenceControl = () => (
  <div className={getClassName('absence-control')}>
    <BpkText
      tagName="h2"
      textStyle="lg"
      className={getClassName('absence-control__heading')}
    >
      Absences for User
    </BpkText>
    <div className={getClassName('absence-control__selectors')}>
      <div>
        <BpkText tagName="p" textStyle="base">AM Slot</BpkText>
        <AbsenceSelectorContainer
          className={getClassName('absence-control__selector')}
          slot={dataConstants.AM_SLOT}
          activeUserId={1}
        />
      </div>
      <div>
        <BpkText tagName="p" textStyle="base">PM Slot</BpkText>
        <AbsenceSelectorContainer
          className={getClassName('absence-control__selector')}
          slot={dataConstants.PM_SLOT}
          activeUserId={1}
        />
      </div>
    </div>
    <BpkText
      tagName="h3"
      textStyle="base"
      className={getClassName('absence-control__legend-heading')}
    >
      Calendar Legend
    </BpkText>
    <div className={getClassName('absence-control__legend')}>
      <BpkText
        tagName="p"
        textStyle="base"
        className={getClassName('absence-control__legend--self-absence')}
      >
        Absence for current user
      </BpkText>
      <BpkText
        tagName="p"
        textStyle="base"
        className={getClassName('absence-control__legend--clash-absence')}
      >
        Absence clashing with other user
      </BpkText>
      <BpkText
        tagName="p"
        textStyle="base"
        className={getClassName('absence-control__legend--other-absence')}
      >
        Absence for other user
      </BpkText>
    </div>
  </div>
);

// DayAbsenceControl.propTypes = {
//   title: PropTypes.string.isRequired,
// };

export default DayAbsenceControl;
