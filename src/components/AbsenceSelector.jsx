import React from 'react';
import PropTypes from 'prop-types';
import BpkRadio from 'bpk-component-radio';

import dataConstants from '../constants/dataConstants';

const AbsenceSelector = ({
  isPresent, isVacation, isPublicHoliday, isTraining, slot, className, onChange,
}) => (
  <div className={className}>
    <BpkRadio
      name={`${slot}-selection`}
      label="Present"
      onChange={() => onChange(dataConstants.PRESENT)}
      checked={isPresent}
    />
    <BpkRadio
      name={`${slot}-selection`}
      label="Vacation"
      onChange={() => onChange(dataConstants.VACATION)}
      checked={isVacation}
    />
    <BpkRadio
      name={`${slot}-selection`}
      label="Public Holiday"
      onChange={() => onChange(dataConstants.PUBLIC_HOLIDAY)}
      checked={isPublicHoliday}
    />
    <BpkRadio
      name={`${slot}-selection`}
      label="Training"
      onChange={() => onChange(dataConstants.TRAINING)}
      checked={isTraining}
    />
  </div>
);

AbsenceSelector.propTypes = {
  isPresent: PropTypes.bool.isRequired,
  isVacation: PropTypes.bool.isRequired,
  isPublicHoliday: PropTypes.bool.isRequired,
  isTraining: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  slot: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AbsenceSelector;
