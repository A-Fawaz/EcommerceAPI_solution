const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  getProduct,
  updateProductById,
  deleteProductById,
  updateProductStockById,
} = require("../controllers/Product");

router.get("/getProducts", getProducts);
router.get("/getProductsSortedByPrice", getProductsSortedByPrice);
router.get("/getProduct/:id", getProduct);
router.post("/addProduct", addProduct);
router.put("/updateProductById/:id", updateProductById);
router.put("/updateProductStockById/:id", updateProductStockById);
router.delete("/deleteProductById/:id", deleteProductById);
module.exports = router;
