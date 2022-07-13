const express = require("express");
const { checkData } = require("./middleware/auth");

const {
  AuthController,
  ProductsController,
  CompanyController,
  ConnectionController,
  UserController,
  StockController,
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
router.get("/retailer/:id/stock/:productid", StockController.getInfoStock);
router.get("/supplier/:id/stock/:productid", StockController.getInfoStock);

// Benoît's Add
router.get(
  "/retailer/:rid/supplier/:sid/stock",
  StockController.getSupplierStock
);

router.post("/retailer/connection", ConnectionController.add);
router.post("/retailer/:id/stock", StockController.add);

router.put("/company/:id", CompanyController.editCompanyInformations);
router.put("/user/:id/profil", UserController.editUserProfil);
router.put(
  "/supplier/clients/pending/:id",
  ConnectionController.updateConnection
);

router.delete(
  "/supplier/clients/pending/:id",
  ConnectionController.deleteConnection
);
router.delete("/retailer/stock/:id", StockController.delete);

module.exports = router;
