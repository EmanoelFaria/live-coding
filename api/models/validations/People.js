const yup = require('yup');

module.exports = yup.object().shape({
  name: yup.string().required(),
  mass: yup.number().positive().required(),
  height: yup.number().positive().required(),
  skin_color: yup.string().required(),
  gender: yup.string().required(),
});
