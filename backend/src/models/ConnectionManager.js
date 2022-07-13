const AbstractManager = require("./AbstractManager");

class ConnectionManager extends AbstractManager {
  static table = "connection";

  demandConnection(user) {
    return this.connection.query(
      `INSERT INTO ${ConnectionManager.table} (status, retailer_id, supplier_id) values ("En attente de connexion", ?, ?)`,
      [user.retailer_id, user.supplier_id]
    );
  }

  validConnection(status, id) {
    return this.connection.query(
      `UPDATE ${ConnectionManager.table} 
      SET status = ? 
      WHERE id = ?`,
      [status, id]
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
