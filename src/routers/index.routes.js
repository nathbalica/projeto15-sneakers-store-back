import { Router } from "express"
import authRouter from "./auth.routes"
import orderRouter from "./order.routes"
import productsRouter from "./products.routes"
import shoppingCartRouter from "./shoppingCart.routes"

const router = Router()

router.use(authRouter)
router.use(orderRouter)
router.use(productsRouter)
router.use(shoppingCartRouter)

export default router
