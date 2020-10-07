const axios = require('axios');

/**
 * @description check request on available types: options, internal service or user.
 */
module.exports = async (req, res, next) => {
  if (req.header('Internal-Service')) return await validateInternalService(req, res, next);
  if (req.header('Authorization')) return await validateUserRequest(req, res, next);

  return res.responser(
    404,
    'Resource Not Found',
    {},
    new ResourceNotFoundAuthError('Request Undefined')
  );
};

function validateInternalService(req, res, next) {
  if (req.header('Internal-Service') == process.env.INTERNAL_SERVICE_KEY) return next();

  return res.responser(
    500,
    'Invalid Internal Service Request',
    {},
    new InvalidInternalServiceRequest('Invalid Internal Service Request')
  );
}

function _isInternalServiceRequest(req) {
  return req.header('Internal-Service');
}

function _isUserRequest(req) {
  return req.header('Authorization');
}

async function validateUserRequest(req, res, next) {
  const url = `${process.env.AUTH_SERVICE_URL}/auth/validate`;
  const options = {
    headers: {
      'Internal-Service': process.env.INTERNAL_SERVICE_KEY,
    },
  };

  try {
    await axios.post(url, _generateValidationBody(req), options);
    return next();
  } catch (error) {
    //TODO: create custom erros for especific case from auth micro service
    console.log(error);
    return res.responser(
      error.response.data.error.status || 500,
      error.response.data.error.message || 'something went wrong',
      {},
      error
    );
  }
}

function _getAccessTokenFromAuthorizationToken(AuthorizationToken) {
  if (!AuthorizationToken) return '';
  return AuthorizationToken.replace('Basic', '').trim();
}

function _getResourceFromUrl(url) {
  return url.split('/').slice(1)[0];
}

function _generateValidationBody(req) {
  return {
    method: req.method,
    resource: _getResourceFromUrl(req.originalUrl),
    accessToken: _getAccessTokenFromAuthorizationToken(req.header('Authorization')),
  };
}

class ResourceNotFoundAuthError extends Error {
  constructor(msg) {
    super(msg);
  }
}

class InvalidInternalServiceRequest extends Error {
  constructor(msg) {
    super(msg);
  }
}

async function validateLocal() {}
