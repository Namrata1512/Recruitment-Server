const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(500).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token,
    config.secret,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.userId = decoded.id;
      next();
    });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next();
      }
    }

    return res.status(500).send({
      message: "Require Admin Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate User role!",
    });
  }
};

isRecruiter = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "Recruiter") {
        return next();
      }
    }

    return res.status(500).send({
      message: "Require Recruiter Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Recruiter role!",
    });
  }
};

isRecruiterOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "Recruiter") {
        return next();
      }

      if (roles[i].name === "admin") {
        return next();
      }
    }

    return res.status(500).send({
      message: "Require Recruiter or Admin Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Recruiter or Admin role!",
    });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isRecruiter,
  isRecruiterOrAdmin,
};
module.exports = authJwt;
