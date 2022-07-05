const AbstractManager = require("./AbstractManager");

class ProductsManager extends AbstractManager {
  static table = "products";

  findAll(query) {
    let sqlQuery = `
    SELECT
    p.id,
    p.product_name,
    c.company_name supplier,
    s.supplier_id,
    s.quantity,
    cat.name category
    FROM ${ProductsManager.table} AS p
    LEFT JOIN stock AS s ON s.product_id = p.id
    LEFT JOIN company AS c ON s.supplier_id = c.id
    LEFT JOIN category AS cat ON p.category_id = cat.id
    `;

    const sqlValue = [];
    if (query.name) {
      sqlQuery += "WHERE product_name LIKE ?";
      sqlValue.push(`%${query.name}%`);
    }
    return this.connection.query(sqlQuery, sqlValue);
  }

  getProducts(id) {
    return this.connection.query(
      `SELECT
      p.id,
      p.product_name,
      c.company_name AS owner,
      comp.company_name AS supplier,
      cat.name,
      s.disponibility
      FROM ${ProductsManager.table} AS p
      LEFT JOIN stock AS s ON s.product_id = p.id
      LEFT JOIN company AS c ON s.owner_id = c.id
      LEFT JOIN company AS comp ON s.supplier_id = comp.id 
      LEFT JOIN category AS cat ON cat.id = p.category_id
      LEFT JOIN user AS u ON c.user_id = u.id
      WHERE u.id=?
      `,
      [id]
    );
  }
}

module.exports = ProductsManager;
