const Joi = require('joi');

const generateResponseSchema = Joi.object({
  userId: Joi.string().required(),
  inputString: Joi.string().required(),
});

export {generateResponseSchema}