module.exports = async (req, res, next) => {
  if (_isInternalServiceRequest(req) && validateInternalService(req)) return next();

  return res.responser(
    500,
    'Invalid Internal Service Request',
    {},
    new InvalidInternalServiceRequest('Invalid Internal Service Request')
  );
};

function validateInternalService(req) {
  return req.header('Internal-Service') == process.env.INTERNAL_SERVICE_KEY;
}

function _isInternalServiceRequest(req) {
  return req.header('Internal-Service');
}

class InvalidInternalServiceRequest extends Error {
  constructor(msg) {
    super(msg);
  }
}
