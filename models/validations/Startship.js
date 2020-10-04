const yup = require('yup');

module.exports = yup.object().shape({
  name: yup.string().required(),
  model: yup.string().required(),
  manufacturer: yup.string().required(),
  passengers: yup.number().positive().required(),
  pilotsIds: yup.array().of(yup.number().positive()),
});
