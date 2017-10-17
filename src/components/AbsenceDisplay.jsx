import React from 'react';
import PropTypes from 'prop-types';
import {
  BpkTable,
  BpkTableHead,
  BpkTableBody,
  BpkTableRow,
  BpkTableCell,
  BpkTableHeadCell,
} from 'bpk-component-table';

const AbsenceDisplay = ({
  absences,
}) => (
  <BpkTable>
    <BpkTableHead>
      <BpkTableRow>
        <BpkTableHeadCell>User</BpkTableHeadCell>
        <BpkTableHeadCell>Slot</BpkTableHeadCell>
        <BpkTableHeadCell>Absence Type</BpkTableHeadCell>
      </BpkTableRow>
    </BpkTableHead>
    <BpkTableBody>
      {absences.map(absence =>
          (<BpkTableRow
            key={absence.key}
          >
            <BpkTableCell>{absence.userName}</BpkTableCell>
            <BpkTableCell>{absence.slot}</BpkTableCell>
            <BpkTableCell>{absence.type}</BpkTableCell>
          </BpkTableRow>),
      )}
    </BpkTableBody>
  </BpkTable>
);

AbsenceDisplay.defaultProps = {
  absences: [],
};

AbsenceDisplay.propTypes = {
  absences: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      slot: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ),
};

export default AbsenceDisplay;
