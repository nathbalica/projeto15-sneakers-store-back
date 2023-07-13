import joi from 'joi';

export const schemaProduct = joi.object({
    name: joi.string().required(),
    brand: joi.string().valid('Nike', "Adidas", 'Puma').required(),
    price: joi.number().required(),
    size: joi.array().required(),
    description: joi.string().required(),
    image: joi.string().required(),
    stock: joi.number().required()
})