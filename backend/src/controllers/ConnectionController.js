const models = require("../models");

class ConnectionController {
  static add = (req, res) => {
    models.connection
      .demandConnection(req.body.retailer_id, req.body.supplier_id)
      .then(([result]) => {
        res.status(201).send({ ...req.body, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static updateConnection = (req, res) => {
    models.connection
      .demandConnection(req.body.retailer_id, req.body.supplier_id)
      .then(([result]) => {
        res.status(201).send({ ...req.body, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = ConnectionController;
