const AbstractManager = require("./AbstractManager");

class CompanyManager extends AbstractManager {
  static table = "company";

  findAll() {
    const sqlQuery = `SELECT * FROM ${CompanyManager.table} `;
    return this.connection.query(sqlQuery);
  }

  findAllSupplier() {
    return this.connection.query(
      `SELECT 
      c.id,
      c.company_name,
      a.name AS domain,
      c.city,
      con.status,
      con.retailer_id,
      con.supplier_id
      FROM ${CompanyManager.table} AS c
    LEFT JOIN activity_field AS a ON c.activity_field_id=a.id
    LEFT JOIN connection AS con ON c.id=con.retailer_id`
    );
  }

  findAllRetailer() {
    return this.connection.query(
      `SELECT 
      c.company_name,
      a.name,
      c.city,
      con.status 
      FROM ${CompanyManager.table} AS c
    LEFT JOIN activity_field AS a ON c.activity_field_id=a.id
    LEFT JOIN connection AS con ON c.id=con.supplier_id
    WHERE c.company_group_id=1`
    );
  }
}

module.exports = CompanyManager;
