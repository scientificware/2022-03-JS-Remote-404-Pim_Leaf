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
    const sqlQuery = `update ${CompanyManager.table} 
    set company_name = ?, 
    description = ?, 
    address = ?, 
    postcode = ?, 
    city = ?, 
    mail = ?, 
    phone = ? 
    where id = ?`;

    const sqlValue = [];
    if (item.company_name) {
      sqlValue.push(item.company_name);
    }
    if (item.description) {
      sqlValue.push(item.description);
    }
    if (item.address) {
      sqlValue.push(item.address);
    }
    if (item.postcode) {
      sqlValue.push(item.postcode);
    }
    if (item.city) {
      sqlValue.push(item.city);
    }
    if (item.mail) {
      sqlValue.push(item.mail);
    }
    if (item.phone) {
      sqlValue.push(item.phone);
    }
    sqlValue.push(item.id);

    return this.connection.query(sqlQuery, sqlValue);
  }
}

module.exports = CompanyManager;
