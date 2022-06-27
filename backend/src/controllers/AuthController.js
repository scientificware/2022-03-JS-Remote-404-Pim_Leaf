/* eslint-disable no-unused-vars */
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const models = require("../models");

require("dotenv").config();

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (plainPassword) => {
  return argon2.hash(plainPassword, hashingOptions);
};

const verifyPassword = (password, hashedPassword) => {
  return argon2.verify(hashedPassword, password);
};

class AuthController {
  static login = async (req, res) => {
    try {
      const validUser = await models.user.findOneByEmail(req.body.email);
      if (!validUser) {
        return res
          .status(400)
          .send({ error: "Incorrect credentials. Please try again." });
      }

      const validPassword = await verifyPassword(
        req.body.password,
        validUser.hashed_password
      );

      if (!validPassword) {
        return res.status(400).send("Incorrect credentials. Please try again.");
      }

      const userCompanyGroup = await models.user.findCompanyUser(validUser.id);

      const token = jwt.sign(
        {
          email: validUser.email,
          company_group: userCompanyGroup.name,
        },
        process.env.PRIVATE_TOKEN
      );
      return res
        .status(200)
        .cookie("user_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 60 * 60),
        })
        .json({
          userCompanyGroup,
        });
    } catch (err) {
      console.error(err);
      return res.status(401).send(err);
    }
  };
}

module.exports = AuthController;
