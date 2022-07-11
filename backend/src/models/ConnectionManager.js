const AbstractManager = require("./AbstractManager");

class ConnectionManager extends AbstractManager {
  static table = "connection";

  demandConnection(retailer, supplier) {
    return this.connection.query(
      `insert into ${ConnectionManager.table} (status, retailer_id, supplier_id) values ("En attente de connexion", ?, ?)`,
      [retailer, supplier]
    );
  }

  validConnection(id) {
    return this.connection.query(
      `update ${ConnectionManager.table} 
      set status = "Connecté" 
      where id = ?`,
      [id]
    );
  }
}

module.exports = ConnectionManager;
