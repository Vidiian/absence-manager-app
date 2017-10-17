import ReactDOM from 'react-dom';

import 'bpk-stylesheets';

import createApplication from './main';

const AbsenteeManager = createApplication();

ReactDOM.render(
  AbsenteeManager,
  document.getElementById('root'),
);
