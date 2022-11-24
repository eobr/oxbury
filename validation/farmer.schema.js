const yup = require("yup");

exports.farmerSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  age: yup.number().required(),
  phone_number: yup.string().required(),
  farm_id: yup.number().required(),
});
