const express = require("express");
const { checkData, checkAuth } = require("./middleware/auth");

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

router.get("/user/:id/products", checkAuth, ProductsController.browse);
router.get("/products/:id", checkAuth, ProductsController.read);
router.get(
  "/retailer/:id/suppliers/connected",
  checkAuth,
  CompanyController.browseSupplierConnected
);
router.get(
  "/retailer/:id/suppliers/pending",
  checkAuth,
  CompanyController.browseSupplierPending
);
router.get("/retailer/suppliers", checkAuth, CompanyController.browseSuppliers);
router.get(
  "/supplier/:id/clients/connected",
  checkAuth,
  CompanyController.browseRetailerConnected
);
router.get(
  "/supplier/:id/clients/pending",
  checkAuth,
  CompanyController.browseRetailerPending
);
router.get("/supplier/clients", checkAuth, CompanyController.browseRetailers);
router.get("/company/:id", checkAuth, UserController.readCompany);
router.get("/user/:id", checkAuth, UserController.readUser);
router.get(
  "/retailer/:id/stock/:productid",
  checkAuth,
  StockController.getInfoStock
);
router.get(
  "/supplier/:id/stock/:productid",
  checkAuth,
  StockController.getInfoStock
);

router.get(
  "/retailer/:rid/supplier/:sid/stock",
  checkAuth,
  StockController.getSupplierStock
);

router.post("/retailer/connection", checkAuth, ConnectionController.add);
router.post("/retailer/:id/stock", checkAuth, StockController.add);
router.post("/supplier/:id/stock", StockController.addProduct);

router.put(
  "/company/:id",
  checkAuth,
  CompanyController.editCompanyInformations
);
router.put("/user/:id/profil", checkAuth, UserController.editUserProfil);
router.put(
  "/supplier/clients/pending/:id",
  checkAuth,
  ConnectionController.updateConnection
);

router.delete(
  "/supplier/clients/pending/:id",
  checkAuth,
  ConnectionController.deleteConnection
);
router.delete("/retailer/stock/:id", checkAuth, StockController.delete);

module.exports = router;
