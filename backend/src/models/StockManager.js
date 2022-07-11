const AbstractManager = require("./AbstractManager");

class StockManager extends AbstractManager {
  static table = "stock";

  addStock(product, owner, supplier, disponibility) {
    return this.connection.query(
      `INSERT INTO ${StockManager.table} (product_id, owner_id, supplier_id, disponibility) values (?, ?, ?, ?)`,
      [product, owner, supplier, disponibility]
    );
  }
}

module.exports = StockManager;
