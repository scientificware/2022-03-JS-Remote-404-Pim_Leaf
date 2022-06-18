const AbstractManager = require("./AbstractManager");

class ProductsManager extends AbstractManager {
  static table = "products";

  findAll(query) {
    let sqlQuery = `
    SELECT p.id, c.company_name, p.product_name, cat.name category_name, s.quantity, g.name group_name, s.retailer_id, s.supplier_id
    FROM ${ProductsManager.table} AS p
    LEFT JOIN stock AS s
    ON s.product_id = p.id
    LEFT JOIN company AS c
    ON s.retailer_id = c.id
    LEFT JOIN category AS cat
    ON p.category_id = cat.id
    LEFT JOIN company_group AS g
    ON c.group_id = g.id
    `;

    const sqlValue = [];
    if (query.name) {
      sqlQuery += "WHERE product_name LIKE ?";
      sqlValue.push(`%${query.name}%`);
    }
    return this.connection.query(sqlQuery, sqlValue);
  }

  insert(item) {
    return this.connection.query(
      `insert into ${ProductsManager.table} (title) values (?)`,
      [item.title]
    );
  }

  update(item) {
    return this.connection.query(
      `update ${ProductsManager.table} set title = ? where id = ?`,
      [item.title, item.id]
    );
  }
}

module.exports = ProductsManager;
