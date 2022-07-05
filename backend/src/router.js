const express = require("express");
const { checkData } = require("./middleware/auth");

const {
  AuthController,
  ProductsController,
  CompanyController,
  UserController,
} = require("./controllers");

const router = express.Router();

router.post("/login", checkData, AuthController.login);

router.get("/products", ProductsController.browse);
router.get("/products/retailer", ProductsController.browseRetailer);
router.get("/products/supplier", ProductsController.browseSupplier);
router.get("/products/:id", ProductsController.read);

router.get("/retailer/suppliers", CompanyController.browse);
router.get("/supplier/clients", CompanyController.browse);
router.get("/retailer/suppliers/:id", CompanyController.browse);
router.get("/supplier/clients/:id", CompanyController.browse);

router.get("/company/:id", UserController.readCompany);
router.get("/profil/:id", UserController.readUser);

module.exports = router;
