const { handleSubmitLead, jsonResponse } = require('./submit-lead-core');

/**
 * AWS Lambda handler for Function URL / API Gateway HTTP API.
 */
exports.handler = async (event) => {
  try {
    return await handleSubmitLead(event);
  } catch (err) {
    console.error('submit-lead handler crash', err);
    return jsonResponse(500, { error: 'Internal server error' });
  }
};
