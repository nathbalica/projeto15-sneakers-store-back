import { ObjectId } from "mongodb";
import { db } from "../database/db.js";
import { schemaProduct } from "../schemas/products.schema.js";

export async function insertProduct(req, res) {
    const { name, brand, price, size, description, image, stock } = req.body;

    const validation = schemaProduct.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errors)
    }

    try {

        const body = { name, brand, price, size, description, image, stock };
        await db.collection('products').insertOne(body);

        return res.status(201).send('Criado com sucesso!');

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function getProduct(req, res) {
    const { id } = req.params;

    try {

        const product = await db.collection("products").findOne({ _id: new ObjectId(id) });
        if (!product) return res.status(404).send("Produto inexistente!");

        res.send(product);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

// export async function getProducts(req, res) {

//     try {

//         const products = await db.collection("products").find().toArray();

//         res.send(products);
//     } catch (err) {
//         console.log(err);
//         return res.status(500).send(err.message);
//     }
// }

export async function getProducts(req, res) {
    const { page = 1, perPage = 5 } = req.query;
    const parsedPage = parseInt(page);
    const parsedPerPage = parseInt(perPage);
  
    try {
      const totalCount = await db.collection("products").countDocuments();
      const totalPages = Math.ceil(totalCount / parsedPerPage);
  
      const products = await db.collection("products").find().toArray();
  
      res.send({
        products,
        currentPage: parsedPage,
        totalPages,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err.message);
    }
  }
  