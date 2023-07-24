const passport = require("passport");
const httpStatus = require("http-status");
const ac = require("../config/roles");

const verify = (req, res, resolve, reject, rights) => async (err, user) => {
  if (err || !user) {
    return reject(new Error("Sorry, unauthorized"));
  }
  req.user = user;

  if (rights.length) {
    const action = rights[0];
    const resource = rights[1];
    const permission = ac.can(user.role)[action](resource);
    if (!permission.granted) {
      return reject(new Error("Sorry, insufficient rights"));
    }
    res.locals.permission = permission;
  }
  resolve();
};

const auth =
  (...rights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verify(req, res, resolve, reject, rights)
      )(req, res, next);
    })
      .then(() => next())
      .catch(err => next(err));
  };

module.exports = auth;
