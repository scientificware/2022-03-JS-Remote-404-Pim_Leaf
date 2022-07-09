const AbstractManager = require("./AbstractManager");

class CompanyManager extends AbstractManager {
  static table = "company";

  findAll() {
    const sqlQuery = `SELECT * FROM ${CompanyManager.table} `;
    return this.connection.query(sqlQuery);
  }

  findUserCompany(id) {
    return this.connection.query(
      `SELECT id FROM ${CompanyManager.table}
      WHERE user_id = ?
        `,
      [id]
    );
  }

  findAllSupplierConnected(id) {
    return this.connection.query(
      `SELECT 
      con.retailer_id,
      con.supplier_id,
      c.company_name,
      a.name AS domain,
      c.city,
      con.status
      FROM ${CompanyManager.table} AS c
      LEFT JOIN connection AS con ON c.id=con.supplier_id
      LEFT JOIN activity_field AS a ON c.activity_field_id=a.id
      WHERE con.retailer_id = ? AND con.status="connecté" AND c.company_group_id=2
      `,
      [id]
    );
  }

  findAllSupplierPending(id) {
    return this.connection.query(
      `SELECT 
      con.retailer_id,
      con.supplier_id,
      c.company_name,
      a.name AS domain,
      c.city,
      con.status
      FROM ${CompanyManager.table} AS c
      LEFT JOIN connection AS con ON c.id=con.supplier_id
      LEFT JOIN activity_field AS a ON c.activity_field_id=a.id
      WHERE con.retailer_id = ? AND con.status="En attente de connexion" AND c.company_group_id=2
      `,
      [id]
    );
  }

  findAllSuppliers() {
    return this.connection.query(
      `SELECT 
      c.id AS company_id,
      c.company_name,
      a.name AS domain,
      c.city
      FROM ${CompanyManager.table} AS c
      LEFT JOIN activity_field AS a ON c.activity_field_id=a.id
      WHERE c.company_group_id =2
      `
    );
  }

  findAllRetailerConnected(id) {
    return this.connection.query(
      `SELECT 
      con.retailer_id,
      con.supplier_id,
      c.company_name,
      a.name AS domain,
      c.city,
      con.status
      FROM ${CompanyManager.table} AS c
      LEFT JOIN connection AS con ON c.id=con.retailer_id
      LEFT JOIN activity_field AS a ON c.activity_field_id=a.id
      WHERE con.supplier_id = ? AND con.status="connecté" AND c.company_group_id=1
      `,
      [id]
    );
  }

  findAllRetailerPending(id) {
    return this.connection.query(
      `SELECT 
      con.retailer_id,
      con.supplier_id,
      c.company_name,
      a.name AS domain,
      c.city,
      con.status
      FROM ${CompanyManager.table} AS c
      LEFT JOIN connection AS con ON c.id=con.retailer_id
      LEFT JOIN activity_field AS a ON c.activity_field_id=a.id
      WHERE con.supplier_id = ? AND con.status="En attente de connexion" AND c.company_group_id=1
      `,
      [id]
    );
  }

  findAllRetailers() {
    return this.connection.query(
      `SELECT 
      c.id AS company_id,
      c.company_name,
      a.name AS domain,
      c.city
      FROM ${CompanyManager.table} AS c
      LEFT JOIN activity_field AS a ON c.activity_field_id=a.id
      WHERE c.company_group_id =1
      `
    );
  }

  updateCompanyInfo(item) {
    return this.connection.query(
      `update ${CompanyManager.table} 
      set company_name = ?, 
      description = ?, 
      address = ?, 
      postcode = ?, 
      city = ?, 
      mail = ?, 
      phone = ? 
      where id = ?`,
      [
        item.company_name,
        item.description,
        item.address,
        item.postcode,
        item.city,
        item.mail,
        item.phone,
        item.id,
      ]
    );
  }
}

module.exports = CompanyManager;
