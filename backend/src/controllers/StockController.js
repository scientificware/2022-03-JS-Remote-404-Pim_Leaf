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
    models.stock
      .addStock(
        req.body.product_id,
        req.params.id,
        req.body.supplier_id,
        req.body.disponibility
      )
      .then(([result]) => {
        res.status(201).send({ ...req.body, id: result.insertId });
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
