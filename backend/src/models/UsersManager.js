const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  static table = "user";

  findOneByEmail(email) {
    return this.connection
      .query(`SELECT * FROM ${UsersManager.table} WHERE email = ?`, [email])
      .then((res) => res[0][0]);
  }

  findCompanyUser(id) {
    return this.connection
      .query(
        `SELECT u.email, c.company_group_id FROM ${UsersManager.table} u
      LEFT JOIN company c
      ON c.user_id = u.id
      WHERE user_id = ?`,
        [id]
      )
      .then((res) => res[0]);
  }
}

module.exports = UsersManager;
