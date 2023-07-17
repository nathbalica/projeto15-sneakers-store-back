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

  export async function getProductSuggestions(req, res) {
    const { search = "" } = req.query;
  
    try {
      const query = {
        name: { $regex: search, $options: "i" },
      };
  
      const suggestions = await db
        .collection("products")
        .find(query)
        .limit(5) // Limite de 5 sugestões
        .toArray();
  
      // Extrai apenas os nomes dos produtos como sugestões
      const suggestionNames = suggestions.map((product) => product.name);
  
      res.send({
        suggestions: suggestionNames,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err.message);
    }
}

export async function searchProducts(req, res) {
    const { searchValue } = req.query;
  
    try {
      const query = {
        name: { $regex: toString(searchValue), $options: "i" },
      };
  
      const searchResults = await db.collection("products").find(query).toArray();
  
      res.send({
        results: searchResults,
      });
    } catch (err) {
      console.error("Error searching products:", err);
      return res.status(500).send(err.message);
    }
  }
  
  