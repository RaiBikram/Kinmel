import Joi from 'joi';

export const userSchemaValidation = Joi.object({
  fullname: Joi.string().min(3).max(30).required(),
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  answer: Joi.string().required(),
});
