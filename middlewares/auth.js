/**
 * @description check request on available types: options, internal service or user.
 */
module.exports = function (req, res, next) {
  if (isGetRequest(req)) {
    if (validateHeaderToken(req)) return next();
    else return res.sendStatus(401);
  }

  return next();
};

/**
 * @description check if request has method "options" and its not internal service
 */
function isGetRequest(req) {
  return req.method === 'GET' ? true : false;
}

function validateHeaderToken(req) {
  return req.header('Authorization') == process.env.API_TOKEN;
}
