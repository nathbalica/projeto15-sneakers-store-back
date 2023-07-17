import { Router } from "express"
import { getProduct, getProducts, insertProduct, getProductSuggestions, searchProducts } from "../controllers/products.controller.js";


const productsRouter = Router()

productsRouter.post('/insert-product', insertProduct);
productsRouter.get("/products/:id", getProduct);
productsRouter.get("/products", getProducts);
productsRouter.get("/product-suggestions", getProductSuggestions);
productsRouter.get("/products-search", searchProducts);

export default productsRouter;