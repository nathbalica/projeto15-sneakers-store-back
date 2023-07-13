import { db } from "../database/db.js";
import { schemaProduct } from "../schemas/products.schema.js";

export async function insertProduct ( req, res ) {
    const { name, brand, price, size, description, image, stock } = req.body;

    const validation = schemaProduct.validate(req.body, { abortEarly: false });

    if( validation.error ){
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errors)
    }

    try {

        const body = { name, brand, price, size, description, image, stock };
        await db.collection('products').insertOne( body );

        return res.status(201).send('Criado com sucesso!');

    } catch (err) {
        return res.status(500).send(err.message);
    }
}