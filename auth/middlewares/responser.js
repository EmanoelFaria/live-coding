module.exports = (req, res, next) => {
  res.responser = (status, message = '', data = {}, error = null, type = 'json') => {
    if (error) {
      if (process.env.NODE_ENV == 'development') console.log(error);
      return res.status(status).type(type).send({
        error: {
          status,
          message,
        },
      });
    }

    return res.status(status).type(type).send({
      data,
      status,
      message,
    });
  };

  next();
};
