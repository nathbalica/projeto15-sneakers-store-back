import joi from 'joi'

export const signupSchema = joi.object({
    name: joi.string().required().messages({
        'any.required': 'O campo "name" é obrigatório.',
        'string.empty': 'O campo "name" não pode estar vazio.',
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo "email" é obrigatório.',
        'string.empty': 'O campo "email" não pode estar vazio.',
        'string.email': 'O campo "email" deve ter um formato válido.',
    }),
    password: joi.string().min(3).required().messages({
        'any.required': 'O campo "password" é obrigatório.',
        'string.empty': 'O campo "password" não pode estar vazio.',
        'string.min': 'A senha deve ter no mínimo 3 caracteres.',
    }),
    
})


export const loginSchema = joi.object({
    email: joi.string().email().required().messages({
        'any.required': 'O campo "email" é obrigatório.',
        'string.empty': 'O campo "email" não pode estar vazio.',
        'string.email': 'O campo "email" deve ter um formato válido.',
    }),
    password: joi.string().min(3).required().messages({
        'any.required': 'O campo "password" é obrigatório.',
        'string.empty': 'O campo "password" não pode estar vazio.',
        'string.min': 'A senha deve ter no mínimo 3 caracteres.',
    }),
    
})