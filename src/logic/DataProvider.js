import { format } from 'date-fns';

import userDataFile from '../data/userdata.json';
import absenceDataFile from '../data/absencedata.json';

const absenceData = () => absenceDataFile;
const userData = () => userDataFile;

const GET = (dataPath) => {
  if (dataPath === 'users') {
    return Promise.resolve(userData());
  } else if (dataPath === 'absences') {
    return Promise.resolve(absenceData());
  }

  throw new Error(`Invalid Data Request unknown endpoint target - ${dataPath}`);
};

const POST = (dataPath, updateProps) => {
  if (dataPath === 'absences') {
    const userId = updateProps.userId;
    const date = format(updateProps.date, 'ddd YYYY-MM-DD');
    const slot = updateProps.slot;
    const type = updateProps.absenceType;
    const updateString = `${userId},${date},${slot},${type}`;
    console.log(`EXAMPLE SERVER UPDATE REQUEST - POST <${updateString}>`);
  } else {
    throw new Error(`Invalid Data Request unknown endpoint target - ${dataPath}`);
  }

}

const DELETE = (dataPath, updateProps) => {
  if (dataPath === 'absences') {
    const userId = updateProps.userId;
    const date = format(updateProps.date, 'ddd YYYY-MM-DD');
    const slot = updateProps.slot;
    const updateString = `${userId},${date},${slot}`;
    console.log(`EXAMPLE SERVER UPDATE REQUEST - DELETE <${updateString}>`);
  } else {
    throw new Error(`Invalid Data Request unknown endpoint target - ${dataPath}`);
  }
};

export default {
  DELETE,
  GET,
  POST,
};
