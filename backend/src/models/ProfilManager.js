const AbstractManager = require("./AbstractManager");

class ProfilManager extends AbstractManager {
  static table = "user";

  getProfil(email) {
    return this.connection
      .query(
        `SELECT u.name, u.mail, c.company_name FROM ${ProfilManager.table} u
      INNER JOIN company c
      ON u.id = c.user_id
      WHERE u.id = ?`,
        [email]
      )
      .then((res) => res[0]);
  }

  getAllProfil() {
    return this.connection.query(`SELECT * from user`).then((res) => res[0]);
  }
}

module.exports = ProfilManager;
