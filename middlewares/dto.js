class DTO {
  static validate(schema) {
    return async (req, res, next) => {
      try {
        const validatedBody = await schema.validate(req.body);
        req.body = validatedBody;
        next();
      } catch (error) {
        res.responser(422, error.message, {}, error);
      }
    };
  }
}

module.exports = { DTO };
