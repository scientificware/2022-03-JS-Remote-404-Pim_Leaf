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
        `SELECT user.mail, company.company_group_id FROM ${UsersManager.table}
      LEFT JOIN company 
      ON company.user_id = user.id
      WHERE user_id = ?`,
        [id]
      )
      .then((res) => res[0]);
  }

  // getProfil(email) {
  //   return this.connection
  //     .query(
  //       `SELECT u.name, u.mail, c.company_name FROM ${UsersManager.table} AS u
  //     INNER JOIN company AS c
  //     ON u.id = c.user_id
  //     WHERE u.mail = ?`,
  //       [email]
  //     )
  //     .then((res) => res[0]);
  // }

  // UserController
  getCompanyInfos(email) {
    return this.connection
      .query(
        `SELECT u.id, a.name AS domain, c.description, c.mail AS company_mail, c.address, c.postcode, c.city, c.phone FROM ${UsersManager.table} AS u
    INNER JOIN company AS c ON c.user_id = u.id
    INNER JOIN activity_field AS a ON a.id = c.activity_field_id
    WHERE u.mail = ?`,
        [email]
      )
      .then((res) => res[0]);
  }

  getUserInfos(email) {
    return this.connection
      .query(`SELECT * FROM ${UsersManager.table} WHERE mail = ?`, [email])
      .then((res) => res[0]);
  }
}

module.exports = UsersManager;
