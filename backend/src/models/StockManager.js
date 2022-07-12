const AbstractManager = require("./AbstractManager");

class StockManager extends AbstractManager {
  static table = "stock";

  addStock(product) {
    return this.connection.query(
      `INSERT INTO ${StockManager.table} (product_id, owner_id, supplier_id, disponibility) values (?, ?, ?, ?)`,
      [
        product.product_id,
        product.owner_id,
        product.supplier_id,
        product.disponibility,
      ]
    );
  }

  infoStock(id, productId) {
    return this.connection.query(
      `SELECT product_id, owner_id, supplier_id, recipe_idea, tips FROM ${StockManager.table} WHERE owner_id = ? AND product_id = ?`,
      [id, productId]
    );
  }
}

module.exports = StockManager;
