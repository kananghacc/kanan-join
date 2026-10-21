const { handleSubmitLead } = require('./submit-lead-core');

/**
 * AWS Lambda handler for Function URL / API Gateway HTTP API.
 */
exports.handler = async (event) => handleSubmitLead(event);
