import { Compute } from 'cerebral';
import { state } from 'cerebral/tags';

const currentDate = new Date().getTime();

export default Compute(state`conferences`, conferences =>
  conferences.filter(conference => conference.conferenceFrom > currentDate)
);
