const joi = require('joi');

class Base {
  static isValid(body) {
    const validation = this.schema().validate(body);
    return validation.error ? false : true;
  }

  static schema() {
    throw new Error('You must implement schema method');
  }
}

module.exports = Base;
