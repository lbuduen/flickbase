const httpStatus = require("http-status");
const { authService } = require("../services");
const { emailService } = require("../services");
const { userService } = require("../services");

const AuthController = {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authService.createUser(email, password);
      const token = authService.genAuthToken(user);

      await emailService.registerEmail(email, user);

      res
        .cookie("x-access-token", token)
        .status(httpStatus.CREATED)
        .send({ user, token });
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send(error.message);
      next();
    }
  },
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authService.signinWithEmailAndPassword(
        email,
        password
      );
      const token = authService.genAuthToken(user);
      res.cookie("x-access-token", token).send({ user, token });
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send(error.message);
      next();
    }
  },
  async isauth(req, res, next) {
    res.json(req.user);
  },
  async checkPassword(req, res, next) {
    const isValid = await req.user.comparePassword(req.body.password);
    res.status(httpStatus.OK).send(isValid);
  },
  async changePassword(req, res, next) {
    try {
      const user = await userService.updateUserPassword(req);
      res.status(httpStatus.OK).send({ ok: true });
    } catch (error) {
      res.status(httpStatus.NOT_FOUND).send(error.message);
      next();
    }
  },
};

module.exports = AuthController;
