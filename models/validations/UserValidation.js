const joi = require('joi');
const Base = require('./Base');

class UserValidation extends Base {
  static schema() {
    return joi.object({
      id: joi.number().integer().positive().label('id'),
      name: joi.string().min(3).max(128).required().label('nome'),
      email: joi
        .string()
        .email({
          minDomainSegments: 2,
        })
        .required()
        .label('email'),
    });
  }
}

module.exports = UserValidation;
