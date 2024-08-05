const Joi = require('joi');
// const JoiImageExtension = require('joi-image-extension');
// const JoiImage = Joi.extend(JoiImageExtension);
const userSchema = {
    register: Joi.object({
        name: Joi.string().required().min(3).max(20),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8).max(16),
        password_confirmation: Joi.any().valid(Joi.ref('password')).required()
    }),
    login: Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8).max(16),
    })
}
const sliderSchema = Joi.object({
    title: Joi.string().required(),
    status: Joi.boolean(),
    order_by: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.allow()
});
const productSchema = Joi.object({
    name: Joi.string().required(),
    count: Joi.number().required(),
    price: Joi.number().required(),
    discount: Joi.number().required(),
    description: Joi.string().required(),
});
module.exports = { productSchema, userSchema ,sliderSchema}