const AbstractManager = require("./AbstractManager");

class ConnectionManager extends AbstractManager {
  static table = "connection";

  demandConnection(retailer, supplier) {
    return this.connection.query(
      `INSERT INTO ${ConnectionManager.table} (status, retailer_id, supplier_id) values ("En attente de connexion", ?, ?)`,
      [retailer, supplier]
    );
  }

  validConnection(id) {
    return this.connection.query(
      `UPDATE ${ConnectionManager.table} 
      SET status = "Connecté" 
      WHERE id = ?`,
      [id]
    );
  }

  deleteConnection(id) {
    return this.connection.query(
      `DELETE FROM ${ConnectionManager.table} 
      WHERE id = ?`,
      [id]
    );
  }
}

module.exports = ConnectionManager;
