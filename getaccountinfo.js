'use strict';
const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({
  // server: 'wss://s1.ripple.com' // Public rippled server
  server: 'wss://s.altnet.rippletest.net:51233' // Test rippled server
});
api.connect().then(() => {
  /* begin custom code ------------------------------------ */
  const myAddress = 'rnTsHZMB3Fq3RPy2LQb6xzvQ3w1gTeZdxv';

  console.log('getting account info for', myAddress);
  return api.getAccountInfo(myAddress);

}).then(info => {
  console.log(info);
  console.log('getAccountInfo done');

  /* end custom code -------------------------------------- */
}).then(() => {
  return api.disconnect();
}).then(() => {
  console.log('done and disconnected.');
}).catch(console.error);