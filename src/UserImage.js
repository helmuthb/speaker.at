import { Compute } from 'cerebral';
import md5 from 'md5';
import { state } from 'cerebral/tags';

export default Compute(state`auth.user.email`, email => {
  const md5Hash = md5(('' + email).trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${md5Hash}?d=retro`;
});
