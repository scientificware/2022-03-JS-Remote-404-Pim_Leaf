const express = require("express");
const { checkData } = require("./middleware/auth");

const {
  AuthController,
  ProductsController,
  // CompanyController,
  // UserController,
} = require("./controllers");

const router = express.Router();

router.post("/login", checkData, AuthController.login);

router.get("/products", ProductsController.browse);
router.get("/products/retailer", ProductsController.browseRetailer);
router.get("/products/supplier", ProductsController.browseSupplier);
router.get("/products/:id", ProductsController.read);

// router.get("/retailer/suppliers", CompanyController.read);
// router.get("/supplier/clients", CompanyController.read);
// router.get("/retailer/suppliers/:id", CompanyController.read);
// router.get("/supplier/clients/:id", CompanyController.read);

// router.get("/company/:id", UserController.read);
// router.get("/profil/:id", UserController.browse);

module.exports = router;
