import { connectWithLifecycle } from 'react-lifecycle-component';
import { addYears, subYears } from 'date-fns';

import Manager from '../components/Manager';
import requestActions from '../actions/data-request-actions';
import selectors from '../selectors';

const mapStateToProps = state => ({
  title: selectors.getTitle(state),
  minDate: subYears(new Date(), 1),
  maxDate: addYears(new Date(), 1),
});

const mapDispatchToProps = dispatch => ({
  componentDidMount: () => {
    dispatch(requestActions.requestUserData());
    dispatch(requestActions.requestAbsenceData());
  },
});

const ManagerContainer = connectWithLifecycle(
  mapStateToProps,
  mapDispatchToProps,
)(Manager);

export default ManagerContainer;
