const models = require("../models");

class ConnectionController {
  static add = (req, res) => {
    models.connection
      .demandConnection(req.body)
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
      .validConnection(req.params.id)
      .then(() => {
        res.status(201).send("connection has been updated");
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static deleteConnection = (req, res) => {
    models.connection
      .deleteConnection(req.params.id)
      .then(() => {
        res.status(201).send("connection has been deleted");
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = ConnectionController;
