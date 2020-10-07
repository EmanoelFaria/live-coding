const express = require('express');
const router = express.Router();

router.get('*', notFoundResponse);
router.post('*', notFoundResponse);

function notFoundResponse(req, res) {
  return res.responser(404, 'Resource not found', {}, new Error('Resource not found'));
}

module.exports = router;
