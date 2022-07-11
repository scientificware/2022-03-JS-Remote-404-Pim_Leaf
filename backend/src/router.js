const express = require("express");
const { checkData } = require("./middleware/auth");

const {
  AuthController,
  ProductsController,
  CompanyController,
  ConnectionController,
  UserController,
} = require("./controllers");

const router = express.Router();

router.post("/login", checkData, AuthController.login);

router.get("/user/:id/products", ProductsController.browse);
router.get("/products/:id", ProductsController.read);
router.get(
  "/retailer/:id/suppliers/connected",
  CompanyController.browseSupplierConnected
);
router.get(
  "/retailer/:id/suppliers/pending",
  CompanyController.browseSupplierPending
);
router.get("/retailer/suppliers", CompanyController.browseSuppliers);
router.get(
  "/supplier/:id/clients/connected",
  CompanyController.browseRetailerConnected
);
router.get(
  "/supplier/:id/clients/pending",
  CompanyController.browseRetailerPending
);
router.get("/supplier/clients", CompanyController.browseRetailers);
router.get("/company/:id", UserController.readCompany);
router.get("/user/:id", UserController.readUser);

router.post("/retailer/connection", ConnectionController.add);

router.put("/company/:id", CompanyController.editCompanyInformations);
router.put("/user/:id/profil", UserController.editUserProfil);

module.exports = router;
