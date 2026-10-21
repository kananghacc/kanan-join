const path = require('path');
const { handleSubmitLead } = require(path.join(
  __dirname,
  '..',
  '..',
  'shared',
  'submit-lead-core.js'
));

exports.handler = async (event) => handleSubmitLead(event);
