const AbstractManager = require("./AbstractManager");

class StockManager extends AbstractManager {
  static table = "stock";

  demandConnection() {
    return this.connection.query(
      `INSERT INTO ${StockManager.table} () values ()`,
      []
    );
  }
}

module.exports = StockManager;
