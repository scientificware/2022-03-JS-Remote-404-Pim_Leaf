const Joi = require("joi");
const jwt = require("jsonwebtoken");

const checkData = (req, res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email().presence("required"),
    password: Joi.string().min(8).max(20).presence("required"),
  }).validate(req.body, { abortEarly: false });

  if (!error) {
    next();
  } else {
    res.status(400).json(error);
  }
};

const checkAuth = (req, res, next) => {
  if (req.cookies) {
    jwt.verify(
      req.cookies.user_token,
      process.env.PRIVATETOKEN,
      (err, decode) => {
        if (err) {
          res
            .status(401)
            .send("Merci de vous connecter pour naviguer sur ce site.");
        } else {
          req.user_token = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send("Désolé vos informations sont erronées.");
  }
};

module.exports = { checkData, checkAuth };
