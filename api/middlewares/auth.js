const axios = require('axios');

/**
 * @description check request on available types: options, internal service or user.
 */
module.exports = async (req, res, next) => {
  const url = `${process.env.AUTH_SERVICE_URL}/auth/validate`;
  try {
    const response = await axios.post(url, _generateValidationBody(req));
    next();
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
};

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

async function validateLocal() {}
