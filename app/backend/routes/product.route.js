import express from "express"

import { createProducts, deleteProducts, getProducts, updateProducts, totalProduct } from "../controller/product.controller.js"
const router = express.Router()

export default router


router.post("/", createProducts)


router.get("/", getProducts)


router.delete("/:id", deleteProducts)


router.put("/:id", updateProducts)

router.get("/count", totalProduct)



//product.route.js