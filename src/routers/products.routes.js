import { Router } from "express"
import { getProduct, getProducts, insertProduct } from "../controllers/products.controller.js";


const productsRouter = Router()

productsRouter.post('/insert-product', insertProduct);
productsRouter.get("/products/:id", getProduct);
productsRouter.get("/products", getProducts);

export default productsRouter;