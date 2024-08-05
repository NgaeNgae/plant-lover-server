const express = require('express');
const router = express.Router();
const productController = require('../../controllers/admin/productContoller')
const { productSchema } = require('../../services/schema');
const { bodyValidator } = require('../../services/validator');
router.get("/", productController.index);
router.post("/", bodyValidator(productSchema), productController.store);
router.get("/:_id", productController.show);
router.delete("/:_id", productController.destroy);
router.patch("/:_id", productController.update);
module.exports = router