import { stripHtml } from 'string-strip-html';

export function validateSchema(schema) {
  return function (req, res, next) {
    const cleanData = {};

    for (const [key, value] of Object.entries(req.body)) {
      cleanData[key] = typeof value === 'string' ? stripHtml(value).result.trim() : value;
    }

    const { error } = schema.validate(cleanData, { abortEarly: false });

    if (error) {
      return res.status(422).json({ error: error.details.map((detail) => detail.message) });
    }

    next();
  };
}