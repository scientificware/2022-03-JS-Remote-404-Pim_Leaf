const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  static table = "user";

  // AuthController
  findOneByEmail(mail) {
    return this.connection
      .query(`SELECT * FROM ${UsersManager.table} WHERE mail = ?`, [mail])
      .then((res) => res[0]);
  }

  findCompanyUser(id) {
    return this.connection
      .query(
        `SELECT
        u.id AS user_id,
        u.name AS user_name,
        u.mail,
        c.id AS company_id,
        c.company_name,
        c.company_group_id
        FROM ${UsersManager.table} u
      LEFT JOIN company c
      ON c.user_id = u.id
      WHERE user_id = ?`,
        [id]
      )
      .then((res) => res[0]);
  }

  // UserController
  getCompanyInfos(id) {
    return this.connection
      .query(
        `SELECT u.id AS user_id, c.id AS company_id, c.company_name, a.name AS domain, c.description, c.mail AS company_mail, c.address, c.postcode, c.city, c.phone FROM ${UsersManager.table} AS u
    INNER JOIN company AS c ON c.user_id = u.id
    INNER JOIN activity_field AS a ON a.id = c.activity_field_id
    WHERE u.id = ?`,
        [id]
      )
      .then((res) => res[0]);
  }

  getUserInfos(id) {
    return this.connection
      .query(
        `SELECT u.id AS user_id, c.company_name, u.name, u.mail FROM ${UsersManager.table} AS u
    INNER JOIN company AS c ON c.user_id = u.id
    WHERE u.id = ?`,
        [id]
      )
      .then((res) => res[0]);
  }
}

module.exports = UsersManager;
