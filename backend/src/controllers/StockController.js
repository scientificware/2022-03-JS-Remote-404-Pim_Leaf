/* eslint-disable no-plusplus */
const models = require("../models");

class StockController {
  static getInfoStock = (req, res) => {
    models.stock
      .infoStock(req.params.id, req.params.productid)
      .then(([rows]) => {
        res.status(200).json(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = (req, res) => {
    const product = req.body;
    models.stock
      .addStock(product)
      .then(([result]) => {
        res.status(201).send({ ...req.body, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static addProduct = (req, res) => {
    models.products
      .addSupplierProduct(req.body)
      .then(([result]) => {
        const stocking = {
          product_id: result.insertId,
          owner_id: parseInt(req.params.id, 10),
          supplier_id: parseInt(req.params.id, 10),
          disponibility: 1,
        };
        models.stock.addStock(stocking).then(() => {
          res.status(201).send("Nice done");
        });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static delete = (req, res) => {
    models.stock
      .deleteStock(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static getSupplierStock = async (req, res) => {
    try {
      const [supplierStock] = await models.products.getProducts(req.params.sid);
      const [retailerStock] = await models.products.getProducts(req.params.rid);
      const retailerStockId = retailerStock.map((stock) => stock.id);
      const availableStock = supplierStock.filter(
        (product) => !retailerStockId.includes(product.id)
      );
      res.status(200).json(availableStock);
    } catch (err) {
      console.error(err);
      res.status(500).send("broken");
    }
  };
}

module.exports = StockController;
